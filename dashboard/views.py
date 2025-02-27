from django.shortcuts import render
from django.http import JsonResponse
from biogas_dashboard_backend.factory import ProcessorFactory
from .singleton import ConfigManager
from django.http import JsonResponse
from .strategy import SumStrategy, AverageStrategy
from .observer import Observable, Logger, Notifier
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import datetime
from django.db import connection
import json
import random
import datetime
import time
from django.core.cache import cache
from .models import EnergyData
from django.utils import timezone 
from django.utils.timezone import now
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model


@login_required
def get_user_role(request):
    user = request.user  # Get currently logged-in user
    return JsonResponse({"role": "admin" if user.is_admin else "user"})  # Adjust according to your model

def get_energy_data(request):
    data = EnergyData.objects.order_by('timestamp')  # ✅ Sort in ascending order
    response_data = [
        {
            'timestamp': entry.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
            'waste_input': entry.waste_input,
            'energy_output': entry.energy_output,
            'methane_prevented': entry.methane_prevented
        }
        for entry in data
    ]
    return JsonResponse({'energy_data': response_data})

def handle_data(request, type):
    data = request.GET.get('data', 'default_data')
    processor = ProcessorFactory.get_processor(type)
    result = processor.process(data)
    return JsonResponse({"result": result})

def config_view(request):
    config = ConfigManager()
    config.set('api_key', '12345')  # Example
    return JsonResponse({"api_key": config.get('api_key')})

@csrf_exempt
def calculate_view(request):
    data = [int(x) for x in request.GET.get('data', '1,2,3').split(',')]
    strategy_type = request.GET.get('strategy', 'sum')

    if strategy_type == 'sum':
        strategy = SumStrategy()
    elif strategy_type == 'average':
        strategy = AverageStrategy()
    else:
        return JsonResponse({"error": "Invalid strategy"}, status=400)

    result = strategy.calculate(data)
    return JsonResponse({"result": result})

@csrf_exempt
def health_update_view(request):
    observable = Observable()
    observable.register_observer(Logger())
    observable.register_observer(Notifier())

    data = "System health updated!"
    observable.notify_observers(data)

    # Example last maintenance date (you can store it in a database later)
    last_maintenance_date = datetime.date(2025, 2, 1).strftime("%Y-%m-%d")

    # Manually add CORS headers
    response = JsonResponse({
        "status": "Healthy",
        "last_maintenance": last_maintenance_date  
    })

    response["Access-Control-Allow-Origin"] = "*"  # Allow all origins
    response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Origin, Content-Type, Accept, Authorization, X-Requested-With"

    return response

@csrf_exempt  # Disable CSRF for simplicity (only for development)
def sign_up_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')
            is_admin = data.get('is_admin', 0)

            with connection.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO users (username, email, password, is_admin)
                    VALUES (%s, %s, %s, %s)
                """, [username, email, password, is_admin])

            return JsonResponse({'message': 'User created successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM users WHERE username = %s", [username])
                user = cursor.fetchone()

            if user:
                db_username, db_email, db_password, db_is_admin = user[1], user[2], user[3], user[4]
                if password == db_password:
                    request.session['username'] = db_username  # Store session
                    request.session['is_admin'] = bool(db_is_admin)  # Store role
                    return JsonResponse({'message': 'Login successful', 'username': db_username, 'is_admin': bool(db_is_admin)}, status=200)
                else:
                    return JsonResponse({'error': 'Incorrect password'}, status=401)
            else:
                return JsonResponse({'error': 'User not found'}, status=404)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


# ✅ **New endpoint to check user role**
@csrf_exempt
def user_role_view(request):
    if 'username' in request.session:
        return JsonResponse({'username': request.session['username'], 'is_admin': request.session.get('is_admin', False)})
    else:
        return JsonResponse({'error': 'User not logged in'}, status=401)

@csrf_exempt
def energy_data_view(request):
    # Simulated energy production data
    energy_data = [
        {"date": "2025-01-01", "value": 100},
        {"date": "2025-01-02", "value": 120},
        {"date": "2025-01-03", "value": 130},
        {"date": "2025-01-04", "value": 110},
        {"date": "2025-01-05", "value": 140},
    ]

    response = JsonResponse({"data": energy_data})
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Origin, Content-Type, Accept, Authorization, X-Requested-With"

    return response

@csrf_exempt
def biogas_data_view(request):
    if request.method == 'GET':
        # ✅ Get the latest entry
        last_entry = EnergyData.objects.order_by('-timestamp').first()

        if last_entry:
            waste_input = round(last_entry.waste_input + random.uniform(0.5, 2.0), 2)
            energy_output = round(last_entry.energy_output + random.uniform(5, 15), 2)
        else:
            waste_input = round(random.uniform(1, 10), 2)
            energy_output = round(random.uniform(50, 200), 2)

        methane_prevented = round(waste_input * 0.25, 2)  # Simple calculation

        EnergyData.objects.create(
            timestamp=now(),
            waste_input=waste_input,
            energy_output=energy_output,
            methane_prevented=methane_prevented
        )

        return JsonResponse({
            'waste_input': waste_input,
            'energy_output': energy_output,
            'methane_prevented': methane_prevented
        })

    return JsonResponse({'error': 'Invalid request method'}, status=405)

# Fetch all users
def get_users(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT id, username, email, is_admin FROM users")
        users = [
            {"id": row[0], "username": row[1], "email": row[2], "role": "Admin" if row[3] else "User"}
            for row in cursor.fetchall()
        ]
    return JsonResponse({"users": users})

# Delete a user
@csrf_exempt
def delete_user(request, user_id):
    if request.method == "DELETE":
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM users WHERE id = %s", [user_id])
        return JsonResponse({"message": "User deleted successfully"})
    return JsonResponse({"error": "Invalid request"}, status=400)