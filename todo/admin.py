from django.contrib import admin
from .models import User, Bucket, Todo

# Register your models here.

admin.site.register(User)
admin.site.register(Bucket)
admin.site.register(Todo)

