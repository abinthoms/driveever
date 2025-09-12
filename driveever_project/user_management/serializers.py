from rest_framework import serializers
from .models import User, InstructorProfile, AcademyProfile, InstructorAvailability, Payment, Booking
from .postcode_service import postcode_service

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    username = serializers.CharField(min_length=3, max_length=150)
    email = serializers.EmailField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'user_type', 'full_name']
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'required': True},
            'email': {'required': True},
            'password': {'required': True}
        }
    
    def validate_email(self, value):
        """
        Check that the email is unique
        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value
    
    def validate_username(self, value):
        """
        Check that the username is unique
        """
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with that username already exists.")
        return value
    
    def create(self, validated_data):
        # Ensure required fields are present
        if 'username' not in validated_data:
            raise serializers.ValidationError("Username is required.")
        if 'email' not in validated_data:
            raise serializers.ValidationError("Email is required.")
        if 'password' not in validated_data:
            raise serializers.ValidationError("Password is required.")
        
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            user_type=validated_data.get('user_type', 'learner'),
            full_name=validated_data.get('full_name', '')
        )
        return user

class LearnerRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    username = serializers.CharField(min_length=3, max_length=150)
    email = serializers.EmailField()
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'full_name']
        extra_kwargs = {
            'username': {'required': True},
            'email': {'required': True},
            'password': {'required': True}
        }
    
    def validate_email(self, value):
        """
        Check that the email is unique
        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value
    
    def validate_username(self, value):
        """
        Check that the username is unique
        """
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with that username already exists.")
        return value
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            user_type='learner',
            full_name=validated_data.get('full_name', '')
        )
        return user

class InstructorRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    username = serializers.CharField(min_length=3, max_length=150)
    email = serializers.EmailField()
    
    # Instructor-specific fields
    mobile_number = serializers.CharField(max_length=20)
    adi_number = serializers.CharField(max_length=20)
    postcodes = serializers.CharField(max_length=500)
    price_per_hour = serializers.DecimalField(max_digits=6, decimal_places=2)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'full_name', 'mobile_number', 'adi_number', 'postcodes', 'price_per_hour']
        extra_kwargs = {
            'username': {'required': True},
            'email': {'required': True},
            'password': {'required': True},
            'mobile_number': {'required': True},
            'adi_number': {'required': True},
            'postcodes': {'required': True},
            'price_per_hour': {'required': True}
        }
    
    def validate_email(self, value):
        """
        Check that the email is unique
        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value
    
    def validate_username(self, value):
        """
        Check that the username is unique
        """
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with that username already exists.")
        return value
    
    def create(self, validated_data):
        # Extract instructor-specific fields
        mobile_number = validated_data.pop('mobile_number')
        adi_number = validated_data.pop('adi_number')
        postcodes = validated_data.pop('postcodes')
        price_per_hour = validated_data.pop('price_per_hour')
        
        # Create user
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            user_type='instructor',
            full_name=validated_data.get('full_name', '')
        )
        
        # Create instructor profile
        InstructorProfile.objects.create(
            user=user,
            mobile_number=mobile_number,
            adi_number=adi_number,
            postcodes=postcodes,
            price_per_hour=price_per_hour
        )
        
        return user
    
    def validate_postcodes(self, value):
        """
        Validate postcodes using Postcodes.io API
        """
        if not value:
            raise serializers.ValidationError("Postcodes are required for instructors.")
        
        # Split postcodes by comma and clean them
        postcode_list = [p.strip() for p in value.split(',') if p.strip()]
        
        if not postcode_list:
            raise serializers.ValidationError("At least one valid postcode is required.")
        
        # Validate each postcode
        invalid_postcodes = []
        for postcode in postcode_list:
            validation_result = postcode_service.validate_postcode(postcode)
            if not validation_result['valid']:
                invalid_postcodes.append(postcode)
        
        if invalid_postcodes:
            raise serializers.ValidationError(
                f"The following postcodes are invalid: {', '.join(invalid_postcodes)}. "
                "Please enter valid UK postcodes."
            )
        
        return value

class AcademyRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    username = serializers.CharField(min_length=3, max_length=150)
    email = serializers.EmailField()
    
    # Academy-specific fields
    academy_name = serializers.CharField(max_length=255)
    owner_name = serializers.CharField(max_length=255)
    business_email = serializers.EmailField()
    main_postcode = serializers.CharField(max_length=10)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'academy_name', 'owner_name', 'business_email', 'main_postcode']
        extra_kwargs = {
            'username': {'required': True},
            'email': {'required': True},
            'password': {'required': True},
            'academy_name': {'required': True},
            'owner_name': {'required': True},
            'business_email': {'required': True},
            'main_postcode': {'required': True}
        }
    
    def validate_email(self, value):
        """
        Check that the email is unique
        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value
    
    def validate_username(self, value):
        """
        Check that the username is unique
        """
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with that username already exists.")
        return value
    
    def create(self, validated_data):
        # Extract academy-specific fields
        academy_name = validated_data.pop('academy_name')
        owner_name = validated_data.pop('owner_name')
        business_email = validated_data.pop('business_email')
        main_postcode = validated_data.pop('main_postcode')
        
        # Create user
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            user_type='academy',
            full_name=owner_name
        )
        
        # Create academy profile
        AcademyProfile.objects.create(
            user=user,
            academy_name=academy_name,
            owner_name=owner_name,
            business_email=business_email,
            main_postcode=main_postcode
        )
        
        return user
    
    def validate_main_postcode(self, value):
        """
        Validate main postcode using Postcodes.io API
        """
        if not value:
            raise serializers.ValidationError("Main postcode is required for academies.")
        
        # Clean postcode
        clean_postcode = value.strip()
        
        # Validate postcode
        validation_result = postcode_service.validate_postcode(clean_postcode)
        if not validation_result['valid']:
            raise serializers.ValidationError(
                f"'{clean_postcode}' is not a valid UK postcode. "
                "Please enter a valid UK postcode."
            )
        
        return clean_postcode

class InstructorProfileSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    full_name = serializers.ReadOnlyField(source='user.full_name')
    
    class Meta:
        model = InstructorProfile
        fields = [
            'id', 'user', 'full_name', 'mobile_number', 'adi_number', 'car_model', 
            'price_per_hour', 'postcodes', 'is_active', 'is_verified', 
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'is_verified']

class AcademyProfileSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    owner_name = serializers.ReadOnlyField(source='user.full_name')
    
    class Meta:
        model = AcademyProfile
        fields = [
            'id', 'user', 'owner_name', 'academy_name', 'business_email', 
            'phone', 'address', 'main_postcode', 'description', 'is_active', 
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class InstructorAvailabilitySerializer(serializers.ModelSerializer):
    day_of_week_display = serializers.CharField(source='get_day_of_week_display', read_only=True)
    instructor_name = serializers.CharField(source='instructor_profile.user.full_name', read_only=True)
    
    class Meta:
        model = InstructorAvailability
        fields = [
            'id', 'instructor_profile', 'instructor_name', 'day_of_week', 
            'day_of_week_display', 'start_time', 'end_time', 'is_available', 
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate(self, data):
        """
        Check that end_time is after start_time.
        """
        if data['start_time'] >= data['end_time']:
            raise serializers.ValidationError("End time must be after start time.")
        return data

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            'id', 'amount', 'currency', 'payment_method', 'status', 
            'transaction_id', 'created_at', 'updated_at', 'completed_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'completed_at']

class BookingSerializer(serializers.ModelSerializer):
    learner_name = serializers.CharField(source='learner.full_name', read_only=True)
    instructor_name = serializers.CharField(source='instructor.full_name', read_only=True)
    payment_status = serializers.CharField(source='payment.status', read_only=True)
    
    class Meta:
        model = Booking
        fields = [
            'id', 'learner', 'learner_name', 'instructor', 'instructor_name',
            'lesson_date', 'start_time', 'end_time', 'duration_hours',
            'status', 'payment', 'payment_status', 'price_per_hour', 'total_price',
            'lesson_type', 'pickup_location', 'dropoff_location', 'notes',
            'created_at', 'updated_at', 'cancelled_at'
        ]
        read_only_fields = ['id', 'total_price', 'created_at', 'updated_at', 'cancelled_at']
    
    def validate(self, data):
        """
        Validate booking data
        """
        # Ensure start time is before end time
        if data['start_time'] >= data['end_time']:
            raise serializers.ValidationError("End time must be after start time.")
        
        # Ensure lesson date is not in the past
        from django.utils import timezone
        if data['lesson_date'] < timezone.now().date():
            raise serializers.ValidationError("Lesson date cannot be in the past.")
        
        # Check if instructor is available at this time
        from datetime import datetime
        lesson_datetime = datetime.combine(data['lesson_date'], data['start_time'])
        day_of_week = lesson_datetime.weekday()
        
        # Check instructor availability for this day and time
        from .models import InstructorAvailability
        availability = InstructorAvailability.objects.filter(
            instructor_profile__user=data['instructor'],
            day_of_week=day_of_week,
            start_time__lte=data['start_time'],
            end_time__gte=data['end_time'],
            is_available=True
        ).first()
        
        if not availability:
            raise serializers.ValidationError(
                "Instructor is not available at the selected time."
            )
        
        # Check for booking conflicts
        conflicting_booking = Booking.objects.filter(
            instructor=data['instructor'],
            lesson_date=data['lesson_date'],
            status__in=['pending', 'confirmed'],
            start_time__lt=data['end_time'],
            end_time__gt=data['start_time']
        ).first()
        
        if conflicting_booking:
            raise serializers.ValidationError(
                "This time slot conflicts with an existing booking."
            )
        
        return data

class BookingCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating new bookings
    """
    class Meta:
        model = Booking
        fields = [
            'instructor', 'lesson_date', 'start_time', 'end_time', 
            'duration_hours', 'lesson_type', 'pickup_location', 
            'dropoff_location', 'notes'
        ]
    
    def validate(self, data):
        """
        Validate booking creation data
        """
        # Get the instructor's price per hour
        try:
            instructor_profile = InstructorProfile.objects.get(user=data['instructor'])
            data['price_per_hour'] = instructor_profile.price_per_hour
        except InstructorProfile.DoesNotExist:
            raise serializers.ValidationError("Instructor profile not found.")
        
        # Validate the data using the main serializer
        booking_serializer = BookingSerializer(data=data)
        booking_serializer.is_valid(raise_exception=True)
        
        return data
    
    def create(self, validated_data):
        # Set the learner from the request user
        validated_data['learner'] = self.context['request'].user
        
        # Create the booking
        booking = Booking.objects.create(**validated_data)
        return booking

class AvailabilityCheckSerializer(serializers.Serializer):
    """
    Serializer for checking instructor availability
    """
    instructor_id = serializers.IntegerField()
    date = serializers.DateField()
    
    def validate_instructor_id(self, value):
        """
        Validate that the instructor exists and is active
        """
        from .models import User, InstructorProfile
        
        try:
            instructor = User.objects.get(id=value, user_type='instructor')
            profile = InstructorProfile.objects.get(user=instructor, is_active=True)
            return value
        except (User.DoesNotExist, InstructorProfile.DoesNotExist):
            raise serializers.ValidationError("Instructor not found or not active.")
    
    def validate_date(self, value):
        """
        Validate that the date is not in the past
        """
        from django.utils import timezone
        if value < timezone.now().date():
            raise serializers.ValidationError("Date cannot be in the past.")
        return value
