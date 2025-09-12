from django.contrib import admin
from .models import User, InstructorProfile, AcademyProfile, InstructorAvailability, Payment, Booking

# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'full_name', 'user_type', 'is_active', 'date_joined']
    list_filter = ['user_type', 'is_active', 'date_joined']
    search_fields = ['username', 'email', 'first_name', 'last_name', 'full_name']
    ordering = ['-date_joined']

@admin.register(InstructorProfile)
class InstructorProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'adi_number', 'price_per_hour', 'is_active', 'is_verified', 'created_at']
    list_filter = ['is_active', 'is_verified', 'created_at']
    search_fields = ['user__username', 'user__full_name', 'adi_number', 'postcodes']
    ordering = ['-created_at']

@admin.register(AcademyProfile)
class AcademyProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'academy_name', 'owner_name', 'main_postcode', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['academy_name', 'owner_name', 'user__username']
    ordering = ['-created_at']

@admin.register(InstructorAvailability)
class InstructorAvailabilityAdmin(admin.ModelAdmin):
    list_display = ['instructor_profile', 'day_of_week', 'start_time', 'end_time', 'is_available']
    list_filter = ['day_of_week', 'is_available', 'instructor_profile__is_active']
    search_fields = ['instructor_profile__user__username', 'instructor_profile__user__full_name']
    ordering = ['instructor_profile', 'day_of_week', 'start_time']

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['id', 'amount', 'currency', 'payment_method', 'status', 'created_at', 'completed_at']
    list_filter = ['status', 'payment_method', 'currency', 'created_at']
    search_fields = ['transaction_id']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Payment Details', {
            'fields': ('amount', 'currency', 'payment_method')
        }),
        ('Status & Tracking', {
            'fields': ('status', 'transaction_id')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'completed_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'learner', 'instructor', 'lesson_date', 'start_time', 'end_time', 
        'status', 'total_price', 'created_at'
    ]
    list_filter = [
        'status', 'lesson_date', 'created_at', 'learner__user_type', 'instructor__user_type'
    ]
    search_fields = [
        'learner__username', 'learner__full_name', 
        'instructor__username', 'instructor__full_name',
        'lesson_type', 'pickup_location'
    ]
    readonly_fields = ['created_at', 'updated_at', 'total_price']
    ordering = ['-lesson_date', '-start_time']
    
    fieldsets = (
        ('Booking Details', {
            'fields': ('learner', 'instructor', 'lesson_type')
        }),
        ('Lesson Schedule', {
            'fields': ('lesson_date', 'start_time', 'end_time', 'duration_hours')
        }),
        ('Location & Notes', {
            'fields': ('pickup_location', 'dropoff_location', 'notes'),
            'classes': ('collapse',)
        }),
        ('Pricing & Payment', {
            'fields': ('price_per_hour', 'total_price', 'payment')
        }),
        ('Status & Timestamps', {
            'fields': ('status', 'cancelled_at', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related(
            'learner', 'instructor', 'payment'
        )
