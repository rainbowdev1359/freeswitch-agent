from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from roles.models import Group
from core.models import UserProfile
from .serializers import UserSerializer, GroupSerializer, SetUserRoleSerializer

class UserInfoList(APIView):
    def get(self, request):
        users = User.objects.all().select_related('profile').order_by('id')  # Efficiently query users and their profiles
        groups = Group.objects.order_by('id').all()  # Query all groups

        user_serializer = UserSerializer(users, many=True)
        group_serializer = GroupSerializer(groups, many=True)

        # Combine both serialized data in the response
        response_data = {
            "users": user_serializer.data,
            "groups": group_serializer.data
        }

        return Response(response_data, status=status.HTTP_200_OK)
    
    def post(self, request):
        print("++++++++++")
        serializer = SetUserRoleSerializer(data=request.data)
        if serializer.is_valid():
            id = serializer.validated_data['user_profile_id']
            role_manage_id = serializer.validated_data['role_manage_id']

            try:
                user_profile = UserProfile.objects.get(id=id)
                user_profile.role_manage_id = role_manage_id
                user_profile.save()
                return Response({"success": "Role updated successfully."}, status=status.HTTP_200_OK)
            except UserProfile.DoesNotExist:
                return Response({"error": "UserProfile not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)