import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {
  test('Instructor can register for an account', async ({ page }) => {
    // Navigate to the registration page
    await page.goto('/api/users/register/');
    
    // Wait for the registration form to be visible
    await expect(page.locator('form')).toBeVisible();
    
    // Fill in all the registration form fields with test data
    await page.fill('input[name="username"]', 'testinstructor123');
    await page.fill('input[name="email"]', 'instructor@test.com');
    await page.fill('input[name="password"]', 'TestPass123!');
    await page.fill('input[name="confirmPassword"]', 'TestPass123!');
    await page.fill('input[name="fullName"]', 'Test Instructor');
    
    // Select instructor user type if it's a dropdown/select
    await page.selectOption('select[name="userType"]', 'instructor');
    
    // Fill in instructor-specific fields if they exist
    await page.fill('input[name="mobileNumber"]', '+447123456789');
    await page.fill('input[name="adiNumber"]', 'ADI123456');
    await page.fill('input[name="postcodes"]', 'SW1A 1AA, W1A 1AA');
    await page.fill('input[name="pricePerHour"]', '35.00');
    
    // Fill in address fields if they exist
    await page.fill('input[name="address"]', '123 Test Street');
    await page.fill('input[name="city"]', 'London');
    await page.fill('input[name="postcode"]', 'SW1A 1AA');
    
    // Accept terms and conditions if checkbox exists
    const termsCheckbox = page.locator('input[name="acceptTerms"]');
    if (await termsCheckbox.isVisible()) {
      await termsCheckbox.check();
    }
    
    // Accept privacy policy if checkbox exists
    const privacyCheckbox = page.locator('input[name="acceptPrivacy"]');
    if (await privacyCheckbox.isVisible()) {
      await privacyCheckbox.check();
    }
    
    // Click the 'Sign Up' button
    await page.click('button[type="submit"], button:has-text("Sign Up"), button:has-text("Register")');
    
    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');
    
    // Assert that the page redirects to login page or dashboard after successful registration
    // Check multiple possible redirect destinations
    const currentUrl = page.url();
    
    // The page should redirect to either:
    // 1. Login page (common after registration)
    // 2. Dashboard page (if auto-login is enabled)
    // 3. Success page with confirmation message
    
    if (currentUrl.includes('/login') || currentUrl.includes('/signin')) {
      // Successfully redirected to login page
      await expect(page).toHaveURL(/.*\/login.*/);
      await expect(page.locator('h1, h2')).toContainText(/login|sign in/i);
    } else if (currentUrl.includes('/dashboard') || currentUrl.includes('/profile')) {
      // Successfully redirected to dashboard/profile page
      await expect(page).toHaveURL(/.*\/dashboard.*|.*\/profile.*/);
      await expect(page.locator('h1, h2')).toContainText(/dashboard|profile|welcome/i);
    } else if (currentUrl.includes('/success') || currentUrl.includes('/verify')) {
      // Successfully redirected to success/verification page
      await expect(page.locator('h1, h2')).toContainText(/success|verification|confirm/i);
    } else {
      // Check if we're still on registration page but with success message
      const successMessage = page.locator('.success, .alert-success, .message-success, [data-testid="success-message"]');
      if (await successMessage.isVisible()) {
        await expect(successMessage).toContainText(/success|registered|created/i);
      } else {
        // If none of the above, fail the test
        throw new Error(`Unexpected redirect destination: ${currentUrl}. Expected login, dashboard, success, or verification page.`);
      }
    }
    
    // Additional assertion: Check that a success message is displayed somewhere on the page
    const successIndicators = [
      '.success',
      '.alert-success', 
      '.message-success',
      '[data-testid="success-message"]',
      'text=successfully',
      'text=registered',
      'text=created'
    ];
    
    let successFound = false;
    for (const selector of successIndicators) {
      try {
        const element = page.locator(selector);
        if (await element.isVisible()) {
          successFound = true;
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }
    
    // If no success message found, check for common success text patterns
    if (!successFound) {
      const pageContent = await page.content();
      const successPatterns = [
        /successfully/i,
        /registered/i,
        /created/i,
        /welcome/i,
        /thank you/i
      ];
      
      successFound = successPatterns.some(pattern => pattern.test(pageContent));
    }
    
    // Assert that some form of success indication is present
    expect(successFound).toBeTruthy();
  });
  
  test('Registration form validation works correctly', async ({ page }) => {
    // Navigate to the registration page
    await page.goto('/api/users/register/');
    
    // Try to submit empty form
    await page.click('button[type="submit"], button:has-text("Sign Up"), button:has-text("Register")');
    
    // Should show validation errors
    await expect(page.locator('.error, .alert-danger, .text-red-500, [data-testid="error-message"]')).toBeVisible();
    
    // Fill in only username and try to submit
    await page.fill('input[name="username"]', 'testuser');
    await page.click('button[type="submit"], button:has-text("Sign Up"), button:has-text("Register")');
    
    // Should still show validation errors for required fields
    await expect(page.locator('.error, .alert-danger, .text-red-500, [data-testid="error-message"]')).toBeVisible();
  });
  
  test('User can navigate between registration and login pages', async ({ page }) => {
    // Navigate to registration page
    await page.goto('/api/users/register/');
    
    // Click on login link if it exists
    const loginLink = page.locator('a:has-text("Login"), a:has-text("Sign In"), a[href*="login"]');
    if (await loginLink.isVisible()) {
      await loginLink.click();
      await expect(page).toHaveURL(/.*\/login.*/);
    }
    
    // Navigate back to registration
    await page.goto('/api/users/register/');
    await expect(page).toHaveURL(/.*\/api\/users\/register.*/);
  });
});
