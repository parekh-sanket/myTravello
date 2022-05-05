from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Customer, User, Agent, Destination, Trip, Payment


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']
    
@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']


@admin.register(Agent)
class AgentAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'company_name']


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ['agent_id', 'name', 'state']


@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ['agent', 'customer', 'destination', 'name', 'age', 'date']


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['card_no', 'cvv_no', 'expiry_date', 'name']


