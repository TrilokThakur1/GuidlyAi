from rest_framework import serializers  

class RegisterSerializer(serializers.Serializer):
    name = serializers.CharField()
    avatar = serializers.URLField()
    email = serializers.EmailField()
    password = serializers.CharField()

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField() 