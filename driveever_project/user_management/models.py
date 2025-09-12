from django.db import models
from django.contrib.auth.models import AbstractUser
from decimal import Decimal

class User(AbstractUser):
    USER_TYPE_CHOICES = [
        ('learner', 'Learner'),
        ('instructor', 'Instructor'),
        ('academy', 'Academy'),
    ]
    
    user_type = models.CharField(
        max_length=20,
        choices=USER_TYPE_CHOICES,
        default='learner'
    )
    
    # Add full name field for personalization
    full_name = models.CharField(max_length=255, blank=True, null=True)
    
    class Meta:
        db_table = 'auth_user'
    
    def save(self, *args, **kwargs):
        # Auto-populate full_name from first_name and last_name if not provided
        if not self.full_name and (self.first_name or self.last_name):
            self.full_name = f"{self.first_name or ''} {self.last_name or ''}".strip()
        super().save(*args, **kwargs)

class InstructorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='instructor_profile')
    
    # Essential verification fields
    mobile_number = models.CharField(max_length=20, blank=True, null=True)
    adi_number = models.CharField(max_length=20, blank=True, null=True, help_text="Approved Driving Instructor Number from DVSA")
    
    # Profile and business fields
    car_model = models.CharField(max_length=100, blank=True, null=True)
    price_per_hour = models.DecimalField(
        max_digits=6, 
        decimal_places=2, 
        default=Decimal('0.00'),
        blank=True,
        null=True
    )
    postcodes = models.TextField(blank=True, null=True, help_text="Postcodes covered (e.g., 'LN1, LN2, LN5')")
    
    # Status fields
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False, help_text="ADI number verification status")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'instructor_profile'
    
    def __str__(self):
        return f'{self.user.full_name or self.user.username} - Instructor Profile'

class AcademyProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='academy_profile')
    
    # Academy business details
    academy_name = models.CharField(max_length=255, blank=True, null=True)
    owner_name = models.CharField(max_length=255, blank=True, null=True, help_text="Main contact person")
    
    # Contact and location
    business_email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    main_postcode = models.CharField(max_length=10, blank=True, null=True, help_text="Main operating postcode")
    
    # Business details
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'academy_profile'
    
    def __str__(self):
        return f'{self.academy_name or self.user.username} - Academy Profile'

class InstructorAvailability(models.Model):
    DAY_CHOICES = [
        (0, 'Monday'),
        (1, 'Tuesday'),
        (2, 'Wednesday'),
        (3, 'Thursday'),
        (4, 'Friday'),
        (5, 'Saturday'),
        (6, 'Sunday'),
    ]
    
    instructor_profile = models.ForeignKey(
        InstructorProfile, 
        on_delete=models.CASCADE, 
        related_name='availability_slots'
    )
    day_of_week = models.IntegerField(choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'instructor_availability'
        unique_together = ['instructor_profile', 'day_of_week', 'start_time']
        ordering = ['day_of_week', 'start_time']
    
    def __str__(self):
        return f'{self.instructor_profile.user.username} - {self.get_day_of_week_display()} ({self.start_time} - {self.end_time})'
    
    def clean(self):
        from django.core.exceptions import ValidationError
        if self.start_time >= self.end_time:
            raise ValidationError('End time must be after start time.')

class Payment(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]
    
    PAYMENT_METHOD_CHOICES = [
        ('stripe', 'Stripe'),
        ('paypal', 'PayPal'),
        ('bank_transfer', 'Bank Transfer'),
    ]
    
    # Payment details
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    currency = models.CharField(max_length=3, default='GBP')
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, default='stripe')
    
    # Status and tracking
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    transaction_id = models.CharField(max_length=255, blank=True, null=True, help_text="External payment provider transaction ID")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        db_table = 'payment'
    
    def __str__(self):
        return f'Payment {self.id} - {self.amount} {self.currency} ({self.status})'

class Booking(models.Model):
    BOOKING_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('no_show', 'No Show'),
    ]
    
    # Core booking relationships
    learner = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='bookings_as_learner',
        limit_choices_to={'user_type': 'learner'}
    )
    instructor = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='bookings_as_instructor',
        limit_choices_to={'user_type': 'instructor'}
    )
    
    # Lesson details
    lesson_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    duration_hours = models.DecimalField(
        max_digits=3, 
        decimal_places=1, 
        default=1.0,
        help_text="Duration in hours (e.g., 1.5 for 1 hour 30 minutes)"
    )
    
    # Status and payment
    status = models.CharField(max_length=20, choices=BOOKING_STATUS_CHOICES, default='pending')
    payment = models.OneToOneField(
        Payment, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='booking'
    )
    
    # Pricing
    price_per_hour = models.DecimalField(max_digits=6, decimal_places=2)
    total_price = models.DecimalField(max_digits=8, decimal_places=2)
    
    # Additional details
    lesson_type = models.CharField(
        max_length=50, 
        blank=True, 
        null=True,
        help_text="e.g., 'First Lesson', 'Test Preparation', 'Highway Practice'"
    )
    pickup_location = models.CharField(max_length=255, blank=True, null=True)
    dropoff_location = models.CharField(max_length=255, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    cancelled_at = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        db_table = 'booking'
        ordering = ['lesson_date', 'start_time']
        indexes = [
            models.Index(fields=['learner', 'lesson_date']),
            models.Index(fields=['instructor', 'lesson_date']),
            models.Index(fields=['status', 'lesson_date']),
        ]
    
    def __str__(self):
        return f'Booking {self.id}: {self.learner.username} with {self.instructor.username} on {self.lesson_date}'
    
    def clean(self):
        from django.core.exceptions import ValidationError
        
        # Ensure start time is before end time
        if self.start_time >= self.end_time:
            raise ValidationError('End time must be after start time.')
        
        # Ensure lesson date is not in the past
        from django.utils import timezone
        if self.lesson_date < timezone.now().date():
            raise ValidationError('Lesson date cannot be in the past.')
        
        # Ensure duration matches start and end times
        from datetime import datetime, timedelta
        start_dt = datetime.combine(self.lesson_date, self.start_time)
        end_dt = datetime.combine(self.lesson_date, self.end_time)
        calculated_duration = (end_dt - start_dt).total_seconds() / 3600  # Convert to hours
        
        if abs(calculated_duration - float(self.duration_hours)) > 0.1:  # Allow small rounding differences
            raise ValidationError('Duration must match the difference between start and end times.')
    
    def save(self, *args, **kwargs):
        # Auto-calculate total price if not set
        if not self.total_price:
            self.total_price = self.price_per_hour * self.duration_hours
        
        # Auto-calculate duration if not set
        if not self.duration_hours:
            from datetime import datetime
            start_dt = datetime.combine(self.lesson_date, self.start_time)
            end_dt = datetime.combine(self.lesson_date, self.end_time)
            self.duration_hours = (end_dt - start_dt).total_seconds() / 3600
        
        super().save(*args, **kwargs)
