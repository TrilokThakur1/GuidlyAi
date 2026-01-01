import jwt
from django.conf import settings
from datetime import datetime, timedelta

def generate_access_jwt(payload):
   payload= payload.copy()
   payload['type'] = 'access'
   payload['exp'] = datetime.utcnow() + timedelta(minutes=15)

   return jwt.encode(
      payload,
      settings.JWT_SECRET,
      algorithm=settings.JWT_ALGORITHM
   )

def generate_refresh_jwt(payload):
   payload= payload.copy()
   payload['type'] = 'refresh'
   payload['exp'] = datetime.utcnow() + timedelta(days=7)

   return jwt.encode(
      payload,
      settings.JWT_SECRET,
      algorithm=settings.JWT_ALGORITHM
   )



def decode_jwt(token):
   return jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])

def extrect_email(token):
   tokenDecoded = decode_jwt(token)
   if tokenDecoded.get("type") != "refresh":
      return "This is not a Refreshtoken"

   return tokenDecoded.get("email")