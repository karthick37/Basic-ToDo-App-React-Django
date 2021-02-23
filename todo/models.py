from django.db import models

# Create your models here.


class User(models.Model):
    user_name = models.CharField(max_length=60, null=False, unique=True)
    user_created_on = models.DateField(auto_now_add=True)

    def __str__(self):
        return '%s, %s' %(self.id, self.user_name)


class Bucket(models.Model):
    bucket_name = models.CharField(max_length=120, null=False)
    bucket_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='users')
    bucket_created_on = models.DateField(auto_now_add=True)

    def __str__(self):
        return '%s, %s' %(self.id, self.bucket_name)

class Todo(models.Model):
    task = models.CharField(max_length=255, null=False)
    task_status = models.CharField(max_length=60, null=False, default="")
    created_at = models.DateField(auto_now_add=True)
    bucket_id = models.ForeignKey(Bucket, on_delete=models.CASCADE, related_name='buckets')

    def __str__(self):
        return '%s, %s'%(self.id, self.task)









