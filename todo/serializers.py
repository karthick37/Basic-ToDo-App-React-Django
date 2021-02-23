from rest_framework import serializers

from todo.models import User, Bucket, Todo


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class BucketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bucket
        fields = '__all__'


class BucketViewSerializer(serializers.ModelSerializer):
    bucket_user = UserSerializer()

    class Meta:
        model = Bucket
        fields = '__all__'


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"


class TodoViewSerializer(serializers.ModelSerializer):
    bucket_id = BucketViewSerializer()

    class Meta:
        model = Todo
        fields = "__all__"


class BucketUserSerializer(serializers.ModelSerializer):
    bucket_user = UserSerializer()
    class Meta:
        model = Bucket
        fields = "__all__"
