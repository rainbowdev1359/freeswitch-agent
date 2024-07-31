from django.db import migrations

def add_initial_data(apps, schema_editor):
    # Get models
    Section = apps.get_model('roles', 'Section')
    Category = apps.get_model('roles', 'Category')
    Group = apps.get_model('roles', 'Group')
    Manage = apps.get_model('roles', 'Manage')

    # Create initial data for sections and categories
    sections_data = [
        ('View dashboard', [('-', )]),
        ('Manage users', [('Add/Remove users', ), ('Modify users role', )]),
        ('Access Billing Information', [('View Invoices', ), ('Process Payments', )]),
        ('Edit Content', [('Create Content', ), ('Edit Existing Content', ), ('Delete Content', )]),
        ('Technical Support', [('Provide Tech Support', ), ('Access Tech Support Tools', )]),
        ('View Reports', [('View Sales Reports', ), ('View Customer Service Reports', )]),
        ('Marketing Campaigns', [('Create Campaigns', ), ('Edit Campaigns', ), ('Delete Campaigns', )]),
        ('Data Management', [('Upload Data', ), ('Download Data', ), ('Data Backup', ), ('Data Recovery', )]),
        ('User Communication', [('Send Notifications', ), ('View User Messages', ), ('Respond to User Queries', )]),
        ('System Configuration', [('Access System Settings', ), ('Change Configuration', ), ('Update System', )]),
        ('Security Management', [('Access Security Logs', ), ('Manage Security Settings', ), ('Perform Security Audits', )])
    ]

    categories = []
    for section_name, category_data in sections_data:
        section = Section.objects.create(section_name=section_name, is_activate=True)
        for category_name, in category_data:
            category = Category.objects.create(category_name=category_name, is_activate=True, role_section=section)
            categories.append(category)

    # Create initial data for groups
    groups_data = [
        'Super Admin',
        'Admin',
        'Technical Support',
        'Customer Support',
        'Billing Support',
        'Marketing Branding',
        'Representative',
        'Representative Assistance'
    ]

    groups = []
    for group_name in groups_data:
        group = Group.objects.create(group_name=group_name, is_activate=True)
        groups.append(group)

    # Create records in the Manage table for each combination of category and group
    for category in categories:
        for group in groups:
            Manage.objects.create(is_permission=True, role_category=category, role_group=group)

class Migration(migrations.Migration):

    dependencies = [
        ('roles', '0001_initial'),  # Ensure this runs after the initial migration
    ]

    operations = [
        migrations.RunPython(add_initial_data),
    ]