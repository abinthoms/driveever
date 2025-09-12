# 🎭 Playwright E2E Testing Guide

This guide explains how to run end-to-end tests for the DriveEver project using Playwright.

## 📋 Prerequisites

- Node.js 16+ and npm
- Python 3.8+ and Django
- Playwright browsers installed

## 🚀 Quick Start

### 1. Install Playwright Browsers
```bash
npm run test:e2e:install
```

### 2. Run E2E Tests
```bash
npm run test:e2e
```

### 3. View Test Reports
```bash
npm run test:e2e:report
```

## 🧪 Test Commands

### Basic Test Execution
```bash
# Run all tests
npm run test:e2e

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Run tests in debug mode
npm run test:e2e:debug
```

### Run Specific Tests
```bash
# Run specific test file
npx playwright test auth.spec.js

# Run specific test by name
npx playwright test -g "Instructor can register for an account"

# Run tests in specific browser
npx playwright test --project=chromium
```

## 📁 Test Structure

### `tests/auth.spec.js`
Contains comprehensive authentication tests:

- **Instructor Registration**: Complete registration flow
- **Form Validation**: Error handling and validation
- **Navigation**: Between registration and login pages

### Test Features
- **Smart Selectors**: Multiple selector strategies for robust element finding
- **Flexible Assertions**: Handles various success scenarios
- **Error Handling**: Graceful handling of missing elements
- **Realistic Data**: Uses realistic test data for registration

## 🔧 Configuration

### `playwright.config.ts`
- **Base URL**: `http://localhost:8000` (Django development server)
- **Web Server**: Automatically starts Django server before tests
- **Browsers**: Chrome, Firefox, Safari support
- **Parallel Execution**: Tests run in parallel for speed
- **Retry Logic**: Automatic retries on CI environments

### Environment Setup
```typescript
webServer: {
  command: 'python manage.py runserver',
  url: 'http://localhost:8000',
  reuseExistingServer: !process.env.CI,
  timeout: 120 * 1000,
}
```

## 🎯 Test Scenarios

### 1. Instructor Registration Flow
```javascript
test('Instructor can register for an account', async ({ page }) => {
  // Navigate to registration page
  await page.goto('/register');
  
  // Fill form fields
  await page.fill('input[name="username"]', 'testinstructor123');
  await page.fill('input[name="email"]', 'instructor@test.com');
  // ... more fields
  
  // Submit form
  await page.click('button[type="submit"]');
  
  // Verify success
  await expect(page).toHaveURL(/.*\/login.*/);
});
```

### 2. Form Validation Testing
```javascript
test('Registration form validation works correctly', async ({ page }) => {
  // Test empty form submission
  await page.click('button[type="submit"]');
  await expect(page.locator('.error')).toBeVisible();
});
```

## 🐛 Debugging Tests

### Debug Mode
```bash
npm run test:e2e:debug
```
- Opens browser in headed mode
- Pauses on breakpoints
- Step-by-step execution

### UI Mode
```bash
npm run test:e2e:ui
```
- Interactive test runner
- Real-time test execution
- Visual debugging tools

### Trace Viewer
```bash
npx playwright show-trace trace.zip
```
- Detailed test execution timeline
- Network requests and responses
- Screenshots at each step

## 📊 Test Reports

### HTML Report
- **Location**: `playwright-report/index.html`
- **Features**: Test results, screenshots, traces
- **Usage**: `npm run test:e2e:report`

### JUnit Report
- **Format**: XML for CI/CD integration
- **Location**: `test-results/results.xml`
- **Usage**: Configure in CI pipeline

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
- name: Install Playwright
  run: npm run test:e2e:install

- name: Run E2E Tests
  run: npm run test:e2e

- name: Upload Test Results
  uses: actions/upload-artifact@v2
  with:
    name: playwright-report
    path: playwright-report/
```

### Environment Variables
```bash
# CI environment
CI=true

# Custom base URL
PLAYWRIGHT_BASE_URL=https://staging.example.com

# Browser selection
PLAYWRIGHT_BROWSER=chromium
```

## 🎨 Customizing Tests

### Page Object Model
```javascript
class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.emailInput = page.locator('input[name="email"]');
    this.submitButton = page.locator('button[type="submit"]');
  }
  
  async fillForm(data) {
    await this.usernameInput.fill(data.username);
    await this.emailInput.fill(data.email);
  }
  
  async submit() {
    await this.submitButton.click();
  }
}
```

### Test Data Management
```javascript
const testUsers = {
  instructor: {
    username: 'testinstructor123',
    email: 'instructor@test.com',
    password: 'TestPass123!',
    userType: 'instructor'
  },
  learner: {
    username: 'testlearner123',
    email: 'learner@test.com',
    password: 'TestPass123!',
    userType: 'learner'
  }
};
```

## 🚨 Troubleshooting

### Common Issues

1. **Server Not Starting**
   ```bash
   # Check Django server manually
   python manage.py runserver
   ```

2. **Browser Installation Issues**
   ```bash
   # Reinstall browsers
   npx playwright install
   ```

3. **Element Not Found**
   ```bash
   # Use debug mode to inspect
   npm run test:e2e:debug
   ```

4. **Timeout Issues**
   ```bash
   # Increase timeout in config
   timeout: 30000
   ```

### Debug Commands
```bash
# Show available browsers
npx playwright --help

# Check browser installation
npx playwright install --dry-run

# Generate test code from actions
npx playwright codegen http://localhost:8000/register
```

## 📈 Best Practices

1. **Use Descriptive Test Names**
   ```javascript
   test('User can successfully register with valid instructor credentials', async ({ page }) => {
   ```

2. **Implement Page Object Model**
   - Separate test logic from page interactions
   - Reusable page objects across tests

3. **Use Data Attributes**
   ```html
   <button data-testid="submit-button">Sign Up</button>
   ```

4. **Handle Async Operations**
   ```javascript
   await page.waitForLoadState('networkidle');
   await expect(page).toHaveURL(/.*\/dashboard.*/);
   ```

5. **Clean Test Data**
   - Reset database state between tests
   - Use unique test data to avoid conflicts

## 🎉 Next Steps

1. **Run the test suite**: `npm run test:e2e`
2. **Explore UI mode**: `npm run test:e2e:ui`
3. **Add more test scenarios**: Extend coverage to other user flows
4. **Integrate with CI/CD**: Add to your deployment pipeline
5. **Create page objects**: Refactor tests for better maintainability

---

**Happy Testing! 🎭✨**



