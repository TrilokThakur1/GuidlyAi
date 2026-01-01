
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/',include("UserApp.urls")),
    path('api/roadmap/', include('RoadMap.urls')),
]
