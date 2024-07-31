from django.db import models

class Section(models.Model):
    section_name = models.CharField(max_length=50)
    is_activate = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.section_name


class Category(models.Model):
    category_name = models.CharField(max_length=100)
    is_activate = models.BooleanField(default=True)
    role_section = models.ForeignKey('Section', on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.category_name


class Group(models.Model):
    group_name = models.CharField(max_length=150)
    is_activate = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.group_name


class Manage(models.Model):
    role_category = models.ForeignKey('Category', on_delete=models.DO_NOTHING)
    role_group = models.ForeignKey('Group', on_delete=models.DO_NOTHING)
    is_permission = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.role_category} - {self.role_group}"