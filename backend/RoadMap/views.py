from rest_framework.decorators import api_view
from rest_framework.response import Response 
from RoadMap.serializer import RoadMapSerializer
  

from RoadMap.utils.AskAi import askAi
from .db import RoadMaps_collection

@api_view(['POST'])
def RoadMapView(request):
    res = askAi(request.data['prompt'])

    serializer =  RoadMapSerializer(data=res)

    if serializer.is_valid():
        data = serializer.data
        new_data = RoadMaps_collection.insert_one(data)
        data['_id'] = str(new_data.inserted_id)
    else:
        data = serializer.errors
    return Response(data)