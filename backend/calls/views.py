# calls/views.py
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes, authentication_classes
import hmac
import hashlib
import base64
import json
import re
import html


from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import TokenAuthentication

from .models import Call
from django.db.models import Q
from agents.models import Agent  # Ensure this import is correct
from .serializers import CallSerializer
from .freeswitch_client import FreeswitchClient  # Use relative import
from django.conf import settings
import requests

def verify_signature(payload, signature):
    expected_signature = hmac.new(
        settings.WEBHOOK_SECRET.encode('utf-8'),
        payload,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected_signature, signature)

def freeswitch_execute(cmd, params):
    result = {}
    if not ESL:
        result['status'] = -1
        result['message'] = "ESL not loaded"
        return result
    else:
        print("======>", settings.ESL_HOSTNAME, settings.ESL_PORT, settings.ESL_SECRET)
        c = ESL.ESLconnection(settings.ESL_HOSTNAME, settings.ESL_PORT, settings.ESL_SECRET)
        if c.connected() != 1:
            print("======> connection fail")
            result['status'] = 0
            result['message'] = "Switch Connection error"
            return result
        print("======> connection success")
        ev = c.api(str(cmd), str(params))

        c.disconnect()
        fs_result = ''
        if ev:
            fs_result = ev.serialize()
            res = fs_result.split('\n\n', 1)
            if res[1]:
                fs_result = res[1]

# import ESL
import time

# def make_call_to_number(destination_number):
#     con = ESL.ESLconnection("52.36.52.240", "8021", "ClueCon")
#     if con.connected():
#         while True:
#             response = con.api("originate", f"sofia/gateway/coperato/{destination_number} &park()")
#             result = response.getBody()
#             if "USER_BUSY" in result:
#                 print(f"{destination_number} is busy. Retrying in 30 seconds...")
#                 time.sleep(30)
#             else:
#                 print(f"Call to {destination_number} succeeded or failed with a different cause: {result}")
#                 break
#     else:
#         print("Failed to connect to FreeSWITCH.")

class CallViewSet(viewsets.ModelViewSet):
    queryset = Call.objects.all()
    serializer_class = CallSerializer

class HelloView(APIView):
    permission_classes = [AllowAny]  # Allow access to anyone
    authentication_classes = []  # Disable authentication for this view

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)

class MakeCallView(APIView):
    permission_classes = [AllowAny]  # Allow access to anyone
    authentication_classes = []  # Disable authentication for this view

    def get(self, request, format=None):
        return Response({})

    def post(self, request, format=None):
        from_phonenumber = request.data.get('from')
        to_phonenumber = request.data.get('to')

        print("from_phonenumber: ", from_phonenumber)
        print("to_phonenumber: ", to_phonenumber)

        try:
            payload = {
                'to_phone': to_phonenumber,
                'from_phone': from_phonenumber
            }
            response = requests.post("http://52.36.52.240:8001/start_outbound_call", json=payload)

            if response.status_code == 200:
                return Response({'status': 'Call initiated and HTTP request sent successfully'}, status=200)
            else:
                return Response({'status': 'Call initiated but HTTP request failed', 'error': response.text}, status=500)

        except requests.RequestException as e:
            return Response({'status': 'Call initiated but HTTP request failed', 'error': str(e)}, status=500)

class PhonenumberView(APIView):
    def get(self, request, format=None):
        return Response({})

class MakeCallSubMenuView(APIView):
    def get(self, request, format=None):
        return Response({})

class ScanCallView(APIView):
    def get(self, request, format=None):
        return Response({})

class ShowCallMenu(APIView):
    def get(self, request, format=None):
        return Response({})

class SendSMSView(APIView):
    def get(self, request, format=None):
        return Response({})

class SMSDLRView(APIView):
    def get(self, request, format=None):
        return Response({})

class IncomingSMSView(APIView):
    def get(self, request, format=None):
        return Response({})
    
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
@permission_classes([AllowAny])
@authentication_classes([])
def make_call(request):
    phone_number = request.data.get('phone_number')
    agent_id = request.data.get('agent_id')

    # Check if both phone_number and agent_id are provided
    if not phone_number or not agent_id:
        return Response({"error": "phone_number and agent_id are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Retrieve the agent by ID
        agent = Agent.objects.get(id=agent_id)
    except Agent.DoesNotExist:
        return Response({"error": "Agent not found"}, status=status.HTTP_404_NOT_FOUND)

    if isinstance(agent.info, list):
        try:
            placeholders = {item['title']: item['value'] for item in agent.info}
        except (KeyError, TypeError):
            return Response({"error": "Invalid format for agent info"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"error": "Agent info should be a list of dictionaries"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Prepare the payload for the Bland API
    TRANSFER_PHONE_NUMBER = "+16398002952"
    # Assuming agent.prompt is a string
    stripped_prompt = strip_html_and_entities(agent.prompt)
    # print("Stripped prompt:", stripped_prompt)

    replaced_prompt = replace_placeholders(stripped_prompt, placeholders)
    # print("Replaced prompt:", replaced_prompt)
    
    payload = {
        'to_number': phone_number,
        'from_number': 3000 + int(agent_id),
        'task': replaced_prompt,
        'voice': agent.voiceID,  # Replaces 'voice_id' and 'reduce_latency'
        'record': True,
        'language': agent.language,
        'transfer_phone_number': TRANSFER_PHONE_NUMBER,
        'answered_by_enabled': True,
        'temperature': agent.temperature,
        'interruption_threshold': agent.interruption,
        'webhook': "https://54.245.14.220:8000/api/calls/callback/",
    }
    
    # Assuming payload is defined elsewhere in your code
    response = requests.post("http://54.185.78.240:8002/createCall", json=payload)

    if response.status_code == 200:
        try:
            response_data = response.json()  # Parse the JSON response
            return Response({
                'status': response_data.get('status'), 
                'message': response_data.get('message')
            }, status=status.HTTP_200_OK)
        except ValueError:
            # Handle JSON parsing error
            return Response({'error': 'Invalid JSON response'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response({'error': 'Request failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
@permission_classes([AllowAny])
@authentication_classes([])
def log(request):
    incomplete_calls = Call.objects.filter(Q(completed=False) | Q(completed__isnull=True))
    for call in incomplete_calls:
        call_id = call.call_id
        try:
            response = requests.get(
                f"https://api.bland.ai/v1/calls/{call_id}",
                headers={
                    'authorization': settings.BLAND_API_KEY,
                    'Content-Type': 'application/json',
                }
            )
            
            if response.status_code == 200:
                call_data = response.json()
                # Update the Call instance with the fetched data
                call.call_length = call_data.get('call_length')
                call.completed = call_data.get('completed')
                call.created_at = call_data.get('created_at')
                # Set default values for fields if they are missing from the response
                call.inbound = call_data.get('inbound', call.inbound)
                call.local_dialing = call_data.get('local_dialing', call.local_dialing)
                call.record = call_data.get('record', call.record)
                call.queue_status = call_data.get('queue_status')
                call.endpoint_url = call_data.get('endpoint_url')
                call.max_duration = call_data.get('max_duration')
                call.error_message = call_data.get('error_message')
                call.variables = call_data.get('variables', {})
                call.answered_by = call_data.get('answered_by')
                call.recording_url = call_data.get('recording_url')
                call.c_id = call_data.get('c_id')
                call.metadata = call_data.get('metadata', {})
                call.summary = call_data.get('summary')
                call.price = call_data.get('price')
                call.started_at = call_data.get('started_at')
                call.call_ended_by = call_data.get('call_ended_by')
                call.pathway_logs = call_data.get('pathway_logs', {})
                call.analysis_schema = call_data.get('analysis_schema', {})
                call.analysis = call_data.get('analysis', {})
                call.transferred_to = call_data.get('transferred_to')
                call.concatenated_transcript = call_data.get('concatenated_transcript')
                call.transcripts = call_data.get('transcripts', [])
                call.call_status = call_data.get('status')
                call.corrected_duration = call_data.get('corrected_duration')
                call.end_at = call_data.get('end_at')
                call.save()
            else:
                print(f"Error fetching call data for call_id {call_id}: {response.status_code}")
        except requests.RequestException as e:
            print(f"Error fetching call data for call_id {call_id}: {str(e)}")

    all_calls_with_agent_info = Call.objects.select_related('agent').values(
        'call_id', 'agent__info', 'call_length', 'batch_id', 'to_number',
        'from_number', 'request_data', 'completed', 'created_at', 'inbound', 'queue_status', 'endpoint_url', 'max_duration',
        'error_message', 'variables', 'answered_by', 'record',
        'recording_url', 'c_id', 'metadata', 'summary', 'price',
        'started_at', 'local_dialing', 'call_ended_by', 'pathway_logs',
        'analysis_schema', 'analysis', 'transferred_to', 'concatenated_transcript',
        'transcripts', 'call_status', 'corrected_duration',
        'end_at'
    )
    return Response({"message": "Log processed successfully.", "logs": list(all_calls_with_agent_info)}, status=status.HTTP_200_OK)
    
    # Modify the data to include a new field 'agentName' with the first value of 'agent__info'
    modified_calls = []
    for call in all_calls_with_agent_info:
        agent_info = call.get('agent__info', [])
        agent_name = None
        if isinstance(agent_info, list):
            # Extract the value where title is 'Agent Name'
            for item in agent_info:
                if item.get('title') == 'Agent Name':
                    agent_name = item.get('value')
                    break
        call['agentName'] = agent_name
        modified_calls.append(call)

    return Response({"message": "Log processed successfully.", "logs": modified_calls}, status=status.HTTP_200_OK)
    
@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def callback(request):
    try:
        payload = request.body
        signature = request.headers.get('x-amz-cf-id')

        response_data = request.data.get('response', {})
        if 'data' in response_data:
            decoded_data = base64.b64decode(response_data['data']).decode('utf-8')
            decoded_data = json.loads(decoded_data)

        call_id = decoded_data.get('call_id')
        call_length = decoded_data.get('call_length')
        batch_id = decoded_data.get('batch_id')
        to_number = decoded_data.get('to')
        from_number = decoded_data.get('from')
        request_data = decoded_data.get('request_data', {})
        completed = decoded_data.get('completed')
        created_at = decoded_data.get('created_at')
        inbound = decoded_data.get('inbound')
        queue_status = decoded_data.get('queue_status')
        endpoint_url = decoded_data.get('endpoint_url')
        max_duration = decoded_data.get('max_duration')
        error_message = decoded_data.get('error_message')
        variables = decoded_data.get('variables', {})
        answered_by = decoded_data.get('answered_by')
        record = decoded_data.get('record')
        recording_url = decoded_data.get('recording_url')
        c_id = decoded_data.get('c_id')
        metadata = decoded_data.get('metadata', {})
        summary = decoded_data.get('summary')
        price = decoded_data.get('price')
        started_at = decoded_data.get('started_at')
        local_dialing = decoded_data.get('local_dialing')
        call_ended_by = decoded_data.get('call_ended_by')
        pathway_logs = decoded_data.get('pathway_logs')
        analysis_schema = decoded_data.get('analysis_schema')
        analysis = decoded_data.get('analysis')
        transferred_to = decoded_data.get('transferred_to')
        concatenated_transcript = decoded_data.get('concatenated_transcript')
        transcripts = decoded_data.get('transcripts', [])
        call_status = decoded_data.get('status')
        corrected_duration = decoded_data.get('corrected_duration')
        end_at = decoded_data.get('end_at')

        if not call_id or not to_number or not from_number:
            return Response(
                {"error": "Missing required fields in the request data."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        # Verify the request signature
        # if not verify_signature(payload, signature):
        #     return Response({'error': 'Invalid signature'}, status=status.HTTP_400_BAD_REQUEST)
            
        # # Process the webhook data
        # webhook_data = request.data
        # print(f"Received webhook data: {webhook_data}")
            
        # Save the data to the database
        call = Call(
            call_id=call_id,
            call_length=call_length,
            batch_id=batch_id,
            to_number=to_number,
            from_number=from_number,
            request_data=request_data,
            completed=completed,
            created_at=created_at,
            inbound=inbound,
            queue_status=queue_status,
            endpoint_url=endpoint_url,
            max_duration=max_duration,
            error_message=error_message,
            variables=variables,
            answered_by=answered_by,
            record=record,
            recording_url=recording_url,
            c_id=c_id,
            metadata=metadata,
            summary=summary,
            price=price,
            started_at=started_at,
            local_dialing=local_dialing,
            call_ended_by=call_ended_by,
            pathway_logs=pathway_logs,
            analysis_schema=analysis_schema,
            analysis=analysis,
            transferred_to=transferred_to,
            concatenated_transcript=concatenated_transcript,
            transcripts=transcripts,
            call_status=call_status,
            corrected_duration=corrected_duration,
            end_at=end_at
        )
        call.save()

        return Response(
            {"message": "Callback request received and data saved successfully."},
            status=status.HTTP_200_OK
        )
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )