from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import *
from rest_framework import status
from .jwt_utils import *


from .db import Users_collection
from .utils import *


@api_view(['POST'])
def RegisterViews(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data

        new_data = Users_collection.insert_one({
            "name":data['name'],
            "avatar":data['avatar'],
            "email":data['email'],
            "password":hash_password(data['password'])
        })
        if new_data:
            access_token = generate_access_jwt({"email":data['email']})
            refresh_token = generate_refresh_jwt({"email":data['email']})

            return Response({
                "message":"User Registered Successfully",
                "refresh_token":refresh_token,
                "access_token":access_token,
            },status=status.HTTP_201_CREATED)
        else:
           return Response(
            {"message":"User Registered Failed",
             "data":serializer.errors},
             status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(
            {"message":"Invalid Data",
             "data":serializer.errors},
             status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def LoginViews(request):
    email = request.data['email']
    password = request.data['password']
   
    user = Users_collection.find_one({"email":email})
    if user:
        if chack_password(password,user['password']):
            access_token = generate_access_jwt({"email":email})
            refresh_token = generate_refresh_jwt({"email":email})
    
            return Response({
                "message":"User Logged In Successfully",
                "refresh_token":refresh_token,
                "access_token":access_token,
            },status=status.HTTP_200_OK)
        else:
            return Response({
                "message":"Invalid Paswsord"
            },status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def UserDetails(request):
    if 'Authorization' not in request.headers:
        return Response({
            "message":"Unauthorized"},status=status.HTTP_401_UNAUTHORIZED)
    token = request.headers['Authorization'].split(" ")[1]
    if token == "null":
        return Response({
            "message":"Unauthorized"},status=status.HTTP_401_UNAUTHORIZED)
    email = extrect_email(token)
 
    user = Users_collection.find_one({"email":email})

    if user:
        return Response({
            "message":"User Found",
            "id":str(user["_id"]),
            "name":user["name"],
            "avatar":user["avatar"],
            "email":user["email"]
        },status=status.HTTP_200_OK)
    else:   
        return Response({
            "message":"User Not Found"},status=status.HTTP_404_NOT_FOUND)   
