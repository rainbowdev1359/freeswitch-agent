# agents/views.py

from django.db.models import Sum, Count, Q, F
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from .models import Agent, Product, Objective
from calls.models import Call
from .serializers import AgentSerializer, ObjectiveSerializer, ProductSerializer
from rest_framework.views import APIView
import re
import html

def strip_html_and_entities(text):
    # Decode HTML entities
    decoded_text = html.unescape(text)

    # Remove HTML tags using regex
    clean_text = re.sub(r'<[^>]+>', '', decoded_text)
    
    return clean_text

def replace_placeholders(text, placeholders):
    # Ensure placeholders is a dictionary
    if not isinstance(placeholders, dict):
        raise ValueError("placeholders should be a dictionary")

    # Use regex to find all placeholders in the text
    return re.sub(r'{{(.*?)}}', lambda match: placeholders.get(match.group(1), match.group(0)), text)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def create_agent(request):
    serializer = AgentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
@authentication_classes([])
def get_agents(request):
    agents = Agent.objects.annotate(
        minutesTalked=Sum('calls__corrected_duration'),
        completedLeads=Count('calls', filter=Q(calls__call_status="no-answer")),
        totalFinishedCalls=Count('calls', filter=Q(calls__call_status="completed"))
    )

    for agent in agents:
        agent.totalIncomingCalls = 0
        total_calls = Call.objects.filter(agent_id=agent.id).count()
        agent.completedLeads = agent.completedLeads / total_calls if total_calls > 0 else 0

    serializer = AgentSerializer(agents, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
@authentication_classes([])
def get_agent_by_id(request, pk):
    try:
        agent = Agent.objects.get(id=pk)
    except Agent.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = AgentSerializer(agent)
    data = serializer.data
    
    # Append the additional field to the response data
    stripped_prompt = strip_html_and_entities(agent.prompt)
    # print("Stripped prompt:", stripped_prompt)
    if isinstance(agent.info, list):
        try:
            placeholders = {item['title']: item['value'] for item in agent.info}
        except (KeyError, TypeError):
            return Response({"error": "Invalid format for agent info"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"error": "Agent info should be a list of dictionaries"}, status=status.HTTP_400_BAD_REQUEST)
    replaced_prompt = replace_placeholders(stripped_prompt, placeholders)

    data['replaced_prompt'] = replaced_prompt

    return Response(data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def delete_agent_by_id(request, pk):
    try:
        agent = Agent.objects.get(pk=pk)
    except Agent.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    agent.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def update_agent_by_id(request):
    pk = request.data.get('id')  # Extract pk from request data
    if not pk:
        return Response({'error': 'ID is required to update an agent'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        agent = Agent.objects.get(pk=pk)
    except Agent.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = AgentSerializer(agent, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ObjectivesList(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        agent_id = request.data.get('id')
        objectives_data = request.data.get('objectives', [])

        if not agent_id or not objectives_data:
            return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)

        agent = Agent.objects.filter(id=agent_id).first()
        if not agent:
            return Response({"error": "Agent not found"}, status=status.HTTP_404_NOT_FOUND)

        # Update or create objectives
        for obj_data in objectives_data:
            question = obj_data.get('question')
            answer = obj_data.get('answer')

            # Safely retrieve and convert `id` to an integer
            try:
                obj_id = int(obj_data.get('id', 0))  # Default to 0 if 'id' is not present
            except (ValueError, TypeError):
                obj_id = 0  # Default to 0 if conversion fails

            if not question or not answer:
                continue  # Skip invalid entries

            if obj_id == 0:
                # Add a new record
                Objective.objects.create(
                    agent=agent,
                    question=question,
                    answer=answer
                )
            else:
                # Update the existing record
                Objective.objects.update_or_create(
                    id=obj_id,
                    defaults={'agent': agent, 'question': question, 'answer': answer}
                )

        return Response({"message": "Objectives updated successfully"}, status=status.HTTP_200_OK)
    
class ObjectivesDelete(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        objectives_data = request.data.get('deleteObjs', [])

        if not objectives_data:
            return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)

        for data in objectives_data:
            try:
                obj_id = int(data['id'])  # Ensure ID is an integer
            except (ValueError, TypeError):
                continue  # Skip invalid IDs

            Objective.objects.filter(id=obj_id).delete()

        return Response({"message": "Objectives deleted successfully"}, status=status.HTTP_200_OK)

class ProductsList(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        agent_id = request.data.get('id')
        products_data = request.data.get('products', [])

        if not agent_id or not products_data:
            return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)

        agent = Agent.objects.filter(id=agent_id).first()
        if not agent:
            return Response({"error": "Agent not found"}, status=status.HTTP_404_NOT_FOUND)

        # Update or create products
        for prod_data in products_data:
            code = prod_data.get('code')
            name = prod_data.get('name')
            description = prod_data.get('description')
            price = prod_data.get('price')
            unit = prod_data.get('unit')

            if not (code and name and description and price and unit):
                continue  # Skip invalid entries

            # Safely retrieve and convert `id` to an integer
            try:
                product_id = int(prod_data.get('id', 0))  # Default to 0 if 'id' is not present
            except (ValueError, TypeError):
                product_id = 0  # Default to 0 if conversion fails

            if product_id == 0:
                # Add a new record
                Product.objects.create(
                    agent=agent,
                    code=code,
                    name=name,
                    description=description,
                    price=price,
                    unit=unit
                )
            else:
                Product.objects.update_or_create(
                    id=product_id,
                    defaults={
                        'agent': agent,
                        'code': code,
                        'name': name,
                        'description': description,
                        'price': price,
                        'unit': unit
                    }
                )

        return Response({"message": "Products updated successfully"}, status=status.HTTP_200_OK)

class ProductsDelete(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        products_data = request.data.get('deleteProducts', [])

        if not products_data:
            return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)

        for data in products_data:
            try:
                prod_id = int(data['id'])  # Ensure ID is an integer
            except (ValueError, TypeError):
                continue  # Skip invalid IDs

            Product.objects.filter(id=prod_id).delete()

        return Response({"message": "Products deleted successfully"}, status=status.HTTP_200_OK)
    
class AgentDetail(APIView):
    def post(self, request, *args, **kwargs):
        agent_id = request.data.get('id')

        if not agent_id:
            return Response({"error": "Agent ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        agent = Agent.objects.filter(id=agent_id).first()
        if not agent:
            return Response({"error": "Agent not found"}, status=status.HTTP_404_NOT_FOUND)

        # Retrieve related objectives and products
        objectives = Objective.objects.filter(agent=agent)
        products = Product.objects.filter(agent=agent)

        # Serialize the data
        agent_serializer = AgentSerializer(agent)
        objectives_serializer = ObjectiveSerializer(objectives, many=True)
        products_serializer = ProductSerializer(products, many=True)

        # Combine the data
        response_data = {
            "agent": agent_serializer.data,
            "objectives": objectives_serializer.data,
            "products": products_serializer.data
        }

        return Response(response_data, status=status.HTTP_200_OK)