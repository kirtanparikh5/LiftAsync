from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,   # /api/token/          (login)
    TokenRefreshView,      # /api/token/refresh/  (get new access)
)
urlpatterns = [
    path('admin/', admin.site.urls),

    # app URLs
    path('api/users/', include('users.urls')),
    path('api/workouts/', include('workouts.urls')),

    # JWT endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
