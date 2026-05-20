# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual.spec.ts >> Visual Regression - Registration Flow >> Success Modal
- Location: tests/e2e/visual.spec.ts:56:3

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  196207 pixels (ratio 0.22 of all image pixels) are different.

  Snapshot: success-modal.png

Call log:
  - Expect "toHaveScreenshot(success-modal.png)" with timeout 5000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 169472 pixels (ratio 0.19 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - 196207 pixels (ratio 0.22 of all image pixels) are different.

```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic:
    - img
  - generic [ref=e5]:
    - generic [ref=e6]:
      - paragraph [ref=e7]: Let’s get started
      - heading "Create your account" [level=1] [ref=e8]
      - paragraph [ref=e9]: Follow the steps to create your account
    - img "Registration illustration" [ref=e11]
  - generic [ref=e16]:
    - generic [ref=e18]:
      - generic [ref=e19]:
        - heading "Create Password for your account" [level=2] [ref=e20]
        - generic [ref=e21]:
          - generic [ref=e22]:
            - text: Enter new password
            - generic [ref=e23]:
              - textbox "Enter new password" [ref=e24]: Password123
              - button [ref=e25] [cursor=pointer]:
                - img [ref=e26]
            - paragraph [ref=e29]: Must be atleast 6 characters
          - generic [ref=e30]:
            - text: Confirm password
            - generic [ref=e31]:
              - textbox "Confirm password" [ref=e32]: Password123
              - button [ref=e33] [cursor=pointer]:
                - img [ref=e34]
            - paragraph [ref=e37]: Both passwords must match
      - generic [ref=e38]:
        - button "Back" [ref=e39] [cursor=pointer]
        - button "Continue" [active] [ref=e40] [cursor=pointer]
    - dialog "Account created successfully" [ref=e42]:
      - generic [ref=e43]:
        - img [ref=e45]
        - heading "You're all set!" [level=2] [ref=e47]
        - paragraph [ref=e48]: Here's a quick summary of your account details
      - generic [ref=e49]:
        - generic [ref=e50]:
          - generic [ref=e51]: Account type
          - generic [ref=e52]: Personal
        - generic [ref=e53]:
          - generic [ref=e54]: Email
          - generic [ref=e55]: jo••••@example.com
        - generic [ref=e56]:
          - generic [ref=e57]: Name
          - generic [ref=e58]: John Doe
        - generic [ref=e59]:
          - generic [ref=e60]: Mobile Number
          - generic [ref=e61]: 8343••9239
      - generic [ref=e62]:
        - img [ref=e63]
        - generic [ref=e66]: Your account is secured with bank-grade security protocols
      - button "Go to Dashboard" [ref=e67] [cursor=pointer]
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
  60 |     await page.fill('input[type="tel"]', '8343989239')
  61 |     await page.click('button:has-text("Continue")')
  62 |     await page.fill('input[aria-label="OTP digit 1"]', '1')
  63 |     await page.fill('input[aria-label="OTP digit 2"]', '2')
  64 |     await page.fill('input[aria-label="OTP digit 3"]', '3')
  65 |     await page.fill('input[aria-label="OTP digit 4"]', '4')
  66 |     await page.click('button:has-text("Continue")')
  67 |     await page.fill('label:has-text("First Name") + input', 'John')
  68 |     await page.fill('label:has-text("Last Name") + input', 'Doe')
  69 |     await page.click('button:has-text("Continue")')
  70 |     await page.fill('label:has-text("Enter new password") + div input', 'Password123')
  71 |     await page.fill('label:has-text("Confirm password") + div input', 'Password123')
  72 |     await page.click('button:has-text("Continue")')
> 73 |     await expect(page).toHaveScreenshot('success-modal.png')
     |                        ^ Error: expect(page).toHaveScreenshot(expected) failed
  74 |   })
  75 | })
  76 | 
```