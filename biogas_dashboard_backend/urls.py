from django.contrib import admin
from django.urls import path
from dashboard.views import (
    handle_data,
    config_view,
    calculate_view,
    health_update_view,
    sign_up_view,
    login_view,
    biogas_data_view,
    get_energy_data,
    user_role_view,
    get_user_role,
    get_users, 
    delete_user, 
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('config/', config_view, name='config_view'),
    path('process/<str:type>/', handle_data, name='handle_data'),
    path('calculate/', calculate_view, name='calculate_view'),
    path('health-update/', health_update_view, name='health_update_view'),
    path('sign-up/', sign_up_view, name='sign_up'),
    path('login/', login_view, name='login'),
    path('energy-data/', get_energy_data, name='energy_data'),  
    path('biogas-data/', biogas_data_view, name='biogas_data'),
    path("user-role/", user_role_view, name="user_role"),
    path("user-role/", get_user_role, name="user_role"),
    path("users/", get_users, name="get_users"),
    path("users/<int:user_id>/", delete_user, name="delete_user"),
]
