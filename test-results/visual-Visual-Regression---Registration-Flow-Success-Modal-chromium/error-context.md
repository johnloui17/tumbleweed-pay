# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual.spec.ts >> Visual Regression - Registration Flow >> Success Modal
- Location: tests/e2e/visual.spec.ts:56:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[type="tel"]')

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Visual Regression - Registration Flow', () => {
  4  |   test('Step 1: Account Type', async ({ page }) => {
  5  |     await page.goto('/')
  6  |     await expect(page).toHaveScreenshot('step-1-account-type.png')
  7  |   })
  8  | 
  9  |   test('Step 2: Mobile Number', async ({ page }) => {
  10 |     await page.goto('/')
  11 |     await page.click('text=Personal')
  12 |     await page.click('button:has-text("Continue")')
  13 |     await expect(page).toHaveScreenshot('step-2-mobile.png')
  14 |   })
  15 | 
  16 |   test('Step 3: OTP Verification', async ({ page }) => {
  17 |     await page.goto('/')
  18 |     await page.click('text=Personal')
  19 |     await page.click('button:has-text("Continue")')
  20 |     await page.fill('input[type="tel"]', '8343989239')
  21 |     await page.click('button:has-text("Continue")')
  22 |     await expect(page).toHaveScreenshot('step-3-otp.png')
  23 |   })
  24 | 
  25 |   test('Step 4: Name', async ({ page }) => {
  26 |     await page.goto('/')
  27 |     await page.click('text=Personal')
  28 |     await page.click('button:has-text("Continue")')
  29 |     await page.fill('input[type="tel"]', '8343989239')
  30 |     await page.click('button:has-text("Continue")')
  31 |     await page.fill('input[aria-label="OTP digit 1"]', '1')
  32 |     await page.fill('input[aria-label="OTP digit 2"]', '2')
  33 |     await page.fill('input[aria-label="OTP digit 3"]', '3')
  34 |     await page.fill('input[aria-label="OTP digit 4"]', '4')
  35 |     await page.click('button:has-text("Continue")')
  36 |     await expect(page).toHaveScreenshot('step-4-name.png')
  37 |   })
  38 | 
  39 |   test('Step 5: Password', async ({ page }) => {
  40 |     await page.goto('/')
  41 |     await page.click('text=Personal')
  42 |     await page.click('button:has-text("Continue")')
  43 |     await page.fill('input[type="tel"]', '8343989239')
  44 |     await page.click('button:has-text("Continue")')
  45 |     await page.fill('input[aria-label="OTP digit 1"]', '1')
  46 |     await page.fill('input[aria-label="OTP digit 2"]', '2')
  47 |     await page.fill('input[aria-label="OTP digit 3"]', '3')
  48 |     await page.fill('input[aria-label="OTP digit 4"]', '4')
  49 |     await page.click('button:has-text("Continue")')
  50 |     await page.fill('label:has-text("First Name") + input', 'John')
  51 |     await page.fill('label:has-text("Last Name") + input', 'Doe')
  52 |     await page.click('button:has-text("Continue")')
  53 |     await expect(page).toHaveScreenshot('step-5-password.png')
  54 |   })
  55 | 
  56 |   test('Success Modal', async ({ page }) => {
  57 |     await page.goto('/')
  58 |     await page.click('text=Personal')
  59 |     await page.click('button:has-text("Continue")')
> 60 |     await page.fill('input[type="tel"]', '8343989239')
     |                ^ Error: page.fill: Test timeout of 30000ms exceeded.
  61 |     await page.click('button:has-text("Continue")')
  62 |     await page.fill('input[aria-label="OTP digit 1"]', '1')
  63 |     await page.fill('input[aria-label="OTP digit 2"]', '2')
  64 |     await page.fill('input[aria-label="OTP digit 3"]', '3')
  65 |     await page.fill('input[aria-label="OTP digit 4"]', '4')
  66 |     await page.click('button:has-text("Continue")')
  67 |     await page.fill('label:has-text("First Name") + input', 'John')
  68 |     await page.fill('label:has-text("Last Name") + input', 'Doe')
  69 |     await page.click('button:has-text("Continue")')
  70 |     await page.fill('label:has-text("Enter new password") + input', 'Password123')
  71 |     await page.fill('label:has-text("Confirm password") + input', 'Password123')
  72 |     await page.click('button:has-text("Continue")')
  73 |     await expect(page).toHaveScreenshot('success-modal.png')
  74 |   })
  75 | })
  76 | 
```