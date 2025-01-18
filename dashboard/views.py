from django.shortcuts import render
from django.http import JsonResponse
from biogas_dashboard_backend.factory import ProcessorFactory
from .singleton import ConfigManager
from django.http import JsonResponse
from .strategy import SumStrategy, AverageStrategy
from .observer import Observable, Logger, Notifier
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

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

    return JsonResponse({"status": "Healthy"})

def config_view(request):
    return JsonResponse({"message": "This is the config endpoint"})
