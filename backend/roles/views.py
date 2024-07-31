import re
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Manage, Group, Section, Category
from .serializers import CustomManageSerializer

class ManageList(APIView):
    def get(self, request):
        # Get all the Manage records with related Category and Group data, sorted by section_id
        manages = Manage.objects.select_related('role_category__role_section', 'role_group').order_by('role_category__role_section__id').all()
        
        # Initialize a dictionary to store the data
        result = {}
        
        # Iterate over the Manage records to construct the desired output
        for manage in manages:
            section_name = manage.role_category.role_section.section_name
            category_name = manage.role_category.category_name
            group_name = re.sub(r'\W+', '_', manage.role_group.group_name.lower())
            is_permission = manage.is_permission
            
            # Initialize the section entry if not already done
            if (section_name, category_name) not in result:
                result[(section_name, category_name)] = {
                    'action_section': section_name,
                    'sub_category': category_name if category_name else '-',
                    'super_admin': False,
                    'admin': False,
                    'technical_support': False,
                    'customer_support': False,
                    'billing_support': False,
                    'marketing_branding': False,
                    'representative': False,
                    'representative_assistance': False,
                }
            
            # Set the permission based on the group name
            result[(section_name, category_name)][group_name] = is_permission
        
        # Convert the result dictionary to a list
        data = [
            {**entry, 'id': index}
            for index, entry in enumerate(result.values())
        ]
        
        return Response(data)
    
    def post(self, request):
        # Extract the data from the request
        updates = request.data
        
        for update in updates:
            section_name = update['action_section']
            category_name = update['sub_category']
            # if category_name == '-':
            #     category_name = None
            
            try:
                role_section = Section.objects.get(section_name=section_name)
                role_category = Category.objects.get(role_section=role_section, category_name=category_name)
            except Section.DoesNotExist:
                return Response({"error": f"Section '{section_name}' does not exist."}, status=status.HTTP_400_BAD_REQUEST)
            except Category.DoesNotExist:
                return Response({"error": f"Category '{category_name}' does not exist."}, status=status.HTTP_400_BAD_REQUEST)
            
            for group_name, is_permission in update.items():
                if group_name in ['action_section', 'sub_category', 'id']:
                    continue
                
                group_name = group_name.replace('_', ' ').title()
                
                try:
                    role_group = Group.objects.get(group_name=group_name)
                except Group.DoesNotExist:
                    return Response({"error": f"Group '{group_name}' does not exist."}, status=status.HTTP_400_BAD_REQUEST)
                
                # Manage.objects.update_or_create(
                #     role_category=role_category, role_group=role_group,
                #     defaults={'is_permission': is_permission}
                # )

                try:
                    manage = Manage.objects.get(role_category=role_category, role_group=role_group)
                    manage.is_permission = is_permission
                    manage.save()
                except Manage.DoesNotExist:
                    # Skip or log missing manage records
                    return Response({"error": f"Manage entry for category '{category_name}' and group '{group_name}' does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"success": "Updated successfully."}, status=status.HTTP_200_OK)