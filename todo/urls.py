from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'buckets', views.BucketViewSet)
router.register(r'todo', views.TodoViewSet)
router.register(r'user_buckets', views.BucketUserViewSet)
router.register(r'todo_view', views.TodoListViewSet)

urlpatterns = [
    path('todo-backend/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
