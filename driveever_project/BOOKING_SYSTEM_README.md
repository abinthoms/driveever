# DriveEver Booking System

## Overview
The DriveEver booking system allows learners to book driving lessons with instructors. It includes a complete backend API with models for bookings, payments, and availability management.

## Database Models

### Payment Model
- **Fields**: amount, currency, payment_method, status, transaction_id, timestamps
- **Status Options**: pending, completed, failed, refunded
- **Payment Methods**: stripe, paypal, bank_transfer

### Booking Model
- **Core Fields**: learner, instructor, lesson_date, start_time, end_time, duration_hours
- **Status Options**: pending, confirmed, completed, cancelled, no_show
- **Additional Fields**: lesson_type, pickup_location, dropoff_location, notes, pricing
- **Validation**: Ensures no time conflicts, valid dates, proper permissions

## API Endpoints

### 1. Check Instructor Availability
**POST** `/api/user/booking/availability/`
```json
{
    "instructor_id": 123,
    "date": "2024-01-15"
}
```
**Response**: Available time slots for the specified date

### 2. Create Booking
**POST** `/api/user/booking/create/`
```json
{
    "instructor": 123,
    "lesson_date": "2024-01-15",
    "start_time": "09:00",
    "end_time": "10:00",
    "duration_hours": 1.0,
    "lesson_type": "First Lesson",
    "pickup_location": "123 Main St",
    "dropoff_location": "456 Oak Ave",
    "notes": "Beginner driver"
}
```
**Requirements**: User must be authenticated as a learner

### 3. View My Bookings
**GET** `/api/user/booking/my-bookings/`
**Response**: Returns both learner and instructor bookings for the authenticated user

### 4. Booking Details
**GET** `/api/user/booking/{booking_id}/`
**PUT** `/api/user/booking/{booking_id}/` (limited fields only)

### 5. Cancel Booking
**POST** `/api/user/booking/{booking_id}/cancel/`
**Requirements**: Cannot cancel within 24 hours of lesson

### 6. Instructor Actions
**POST** `/api/user/booking/{booking_id}/confirm/` - Confirm pending booking
**POST** `/api/user/booking/{booking_id}/complete/` - Mark as completed

### 7. Instructor Calendar View
**GET** `/api/user/instructor/{instructor_id}/bookings/`
**Query Parameters**: start_date, end_date (optional)

## User Flow

### Learner Journey
1. **Search**: Find instructor by postcode
2. **Profile View**: View instructor details and pricing
3. **Check Availability**: See available time slots
4. **Book Lesson**: Select time and provide details
5. **Payment**: Complete payment (future integration)
6. **Confirmation**: Receive booking confirmation
7. **Dashboard**: View upcoming lessons

### Instructor Journey
1. **Set Availability**: Configure weekly schedule
2. **Receive Requests**: View pending bookings
3. **Confirm Bookings**: Accept or reject requests
4. **Manage Calendar**: View all bookings and availability
5. **Complete Lessons**: Mark lessons as completed

## Security Features

- **Authentication Required**: All booking endpoints require login
- **Permission Checks**: Users can only access their own bookings
- **Role Validation**: Only learners can create bookings
- **Status Validation**: Prevents invalid state transitions
- **Time Validation**: Prevents past dates and time conflicts

## Business Rules

- Bookings cannot be made for past dates
- Cancellations require 24-hour notice
- Only pending/confirmed bookings can be cancelled
- Instructors must confirm pending bookings
- Completed bookings cannot be modified
- Payment status affects booking status

## Future Enhancements

### Payment Integration
- Stripe payment processing
- Automatic payment status updates
- Refund handling for cancellations

### Notification System
- Email confirmations
- SMS reminders
- Push notifications

### Advanced Features
- Recurring lesson bookings
- Group lesson support
- Instructor rating system
- Lesson feedback forms

## Testing the System

### 1. Create Test Users
```bash
# Create a learner
curl -X POST http://localhost:8000/api/user/register/learner/ \
  -H "Content-Type: application/json" \
  -d '{"username": "testlearner", "email": "learner@test.com", "password": "testpass123", "full_name": "Test Learner"}'

# Create an instructor
curl -X POST http://localhost:8000/api/user/register/instructor/ \
  -H "Content-Type: application/json" \
  -d '{"username": "testinstructor", "email": "instructor@test.com", "password": "testpass123", "full_name": "Test Instructor", "mobile_number": "07123456789", "adi_number": "ADI123456", "price_per_hour": "25.00", "postcodes": "LN1,LN2"}'
```

### 2. Set Instructor Availability
```bash
# Login and get token, then set availability
curl -X POST http://localhost:8000/api/user/availability/ \
  -H "Authorization: Token YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"day_of_week": 1, "start_time": "09:00", "end_time": "17:00", "is_available": true}'
```

### 3. Check Availability
```bash
curl -X POST http://localhost:8000/api/user/booking/availability/ \
  -H "Authorization: Token YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"instructor_id": 2, "date": "2024-01-15"}'
```

### 4. Create Booking
```bash
curl -X POST http://localhost:8000/api/user/booking/create/ \
  -H "Authorization: Token YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"instructor": 2, "lesson_date": "2024-01-15", "start_time": "09:00", "end_time": "10:00", "lesson_type": "First Lesson"}'
```

## Database Schema

The system creates the following tables:
- `payment` - Payment records
- `booking` - Lesson bookings
- `instructor_availability` - Weekly availability slots
- `instructor_profile` - Instructor business details
- `academy_profile` - Academy business details
- `auth_user` - User accounts (custom User model)

## Admin Interface

All models are registered in Django admin with:
- Comprehensive list displays
- Filtering and search capabilities
- Organized field sets
- Read-only protection for sensitive fields

## Next Steps

1. **Frontend Development**: Create React components for the booking flow
2. **Payment Integration**: Implement Stripe payment processing
3. **Testing**: Add comprehensive test coverage
4. **Deployment**: Configure production environment
5. **Monitoring**: Add logging and error tracking

## Support

For questions or issues with the booking system, refer to the API documentation or contact the development team.


