# 🧪 DriveEver Testing Guide

This guide explains how to run tests for the DriveEver project using pytest with HTML reports and code coverage.

## 📋 Prerequisites

- Python 3.8+
- Django 4.0+
- pytest and related packages (already installed)

## 🚀 Quick Start

### Option 1: Using the Test Runner Script (Recommended)
```bash
python run_tests.py
```

### Option 2: Using pytest directly
```bash
python -m pytest
```

### Option 3: Run specific test file
```bash
python -m pytest user_management/test_views.py -v
```

### Option 4: Run specific test function
```bash
python -m pytest user_management/test_views.py::TestUserRegistrationView::test_user_registration_success -v
```

## 📊 Generated Reports

After running tests, you'll find:

- **HTML Test Report**: `reports/test_report.html`
- **Coverage Report**: `reports/coverage/index.html`
- **Terminal Coverage**: Displayed in terminal with missing lines

## 🧩 Test Structure

### `test_views.py`
Contains comprehensive tests for the `UserRegistrationView`:

- ✅ **Success Cases**: Valid user registration
- ❌ **Error Cases**: Invalid data, missing fields
- 🔄 **Edge Cases**: Duplicate users, optional fields
- 🛡️ **Security**: Password hashing verification

### Test Categories

1. **Unit Tests**: Test individual components in isolation
2. **Integration Tests**: Test component interactions
3. **API Tests**: Test REST API endpoints

## 🎯 Test Coverage

The test suite aims for **80%+ code coverage** and includes:

- **User Registration**: All success and failure scenarios
- **Data Validation**: Field validation and error handling
- **Database Operations**: User creation and uniqueness
- **Response Formatting**: API response structure and status codes

## 🔧 Configuration

### `pytest.ini`
- Django settings configuration
- HTML and coverage report settings
- Test discovery patterns
- Warning filters

### Coverage Settings
- **Target**: 80% minimum coverage
- **Reports**: HTML and terminal output
- **Focus**: `user_management` app

## 📝 Writing New Tests

### Test Class Structure
```python
class TestYourView:
    @pytest.fixture
    def api_client(self):
        return APIClient()
    
    def test_your_functionality(self, api_client):
        # Your test logic here
        assert True
```

### Best Practices
1. **Use fixtures** for common setup
2. **Test both success and failure cases**
3. **Verify database state changes**
4. **Check API response formats**
5. **Use descriptive test names**

## 🐛 Troubleshooting

### Common Issues

1. **Import Errors**: Ensure Django is properly configured
2. **Database Issues**: Check if test database is created
3. **Coverage Issues**: Verify source files are in correct paths

### Debug Mode
```bash
python -m pytest -s -v --tb=long
```

## 📈 Continuous Integration

The test suite is designed to work with CI/CD pipelines:

- **Exit Codes**: Proper exit codes for CI systems
- **HTML Reports**: Self-contained reports for CI artifacts
- **Coverage Reports**: Coverage data for quality gates

## 🔍 Test Examples

### Basic API Test
```python
def test_user_registration_success(self, api_client, valid_user_data):
    url = reverse('user-register')
    response = api_client.post(url, valid_user_data, format='json')
    
    assert response.status_code == status.HTTP_201_CREATED
    assert User.objects.filter(username=valid_user_data['username']).exists()
```

### Database State Verification
```python
def test_user_creation_in_database(self, api_client, valid_user_data):
    initial_count = User.objects.count()
    
    url = reverse('user-register')
    api_client.post(url, valid_user_data, format='json')
    
    final_count = User.objects.count()
    assert final_count == initial_count + 1
```

## 📚 Additional Resources

- [pytest Documentation](https://docs.pytest.org/)
- [Django Testing](https://docs.djangoproject.com/en/stable/topics/testing/)
- [DRF Testing](https://www.django-rest-framework.org/api-guide/testing/)

## 🎉 Next Steps

1. **Run the test suite**: `python run_tests.py`
2. **Review coverage**: Check `reports/coverage/index.html`
3. **Add more tests**: Extend coverage to other views/models
4. **Integrate with CI/CD**: Add to your deployment pipeline

---

**Happy Testing! 🚗✨**



