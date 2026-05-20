# High-Level Design & Submission Flow

This document details the high-level design structure extracted from the provided Figma/PDF designs, along with the step-by-step data submission and validation flow for the multi-step registration process.

## General Layout Design (Shared Shell)
The application utilizes a shared, responsive 2-column layout for desktop:
- **Left Panel (Static):** Contains the branding text ("Let's get started", "Create your account", "Follow the steps to create your account") and a decorative illustration.
- **Right Panel (Dynamic):** Contains a progress indicator (5 dots) at the top, the dynamic form content for the current step in the center, and persistent navigation actions ("Back" and "Continue" buttons) fixed at the bottom of the form area.
- **Mobile Behavior:** The left panel illustration is hidden, and the right panel form takes full width.

---

## Screen-by-Screen Breakdown & Submission Flow

### Step 1: Account Type Selection
**High-Level Design:**
- **Heading:** "To join us tell us what type of account you are opening"
- **UI Elements:** Two selectable radio-style cards ("Personal" with a user icon, "Business" with a briefcase icon).
- **Active State:** The selected card gets a brand-colored border, a slight background tint, and a checkmark icon in the top right.
- **Actions:** "Back" button is hidden on this first step. "Continue" button is disabled until a selection is made.

**Submission Flow:**
1. User clicks either "Personal" or "Business".
2. Local component state updates the selection.
3. User clicks "Continue".
4. **Validation:** Checks if `accountType` is not null.
5. **Action:** Zod validates the schema. If valid, the value is saved to the Zustand `registrationStore` (`setField('accountType', value)`).
6. **Navigation:** Triggers `onNext()` to advance to Step 2 (slides in from right).

---

### Step 2: Mobile Number Entry
**High-Level Design:**
- **Heading:** "OTP Verification"
- **Sub-heading:** "Mobile Number*"
- **UI Elements:** A single text input field pre-fixed with a static "+91" country code (non-editable, gray background).
- **Actions:** "Back" (Ghost button) and "Continue" (Primary button).

**Submission Flow:**
1. User enters a 10-digit mobile number.
2. User clicks "Continue" (or presses Enter).
3. **Validation:** Zod schema validates the input against a regex for exactly 10 digits (`/^\d{10}$/`). Validation errors show below the input on blur or submit.
4. **Action:** If valid, the value is saved to the Zustand `registrationStore` (`setField('mobile', value)`).
5. **Navigation:** Triggers `onNext()` to advance to Step 3. (Note: In a real app, this step would trigger the backend API to send the SMS OTP).

---

### Step 3: OTP Verification
**High-Level Design:**
- **Heading:** "OTP Verification"
- **UI Elements:** Four individual, square, single-character input boxes centered on the screen.
- **Helper Text:** "Did not receive OTP? Resend OTP" with a 30-second countdown timer.
- **Interactions:** Auto-advances focus on type, handles backspace to previous box, handles paste distribution. Error state triggers a horizontal shake animation and turns borders red.
- **Actions:** "Back" and "Continue".

**Submission Flow:**
1. User types or pastes the 4-digit OTP.
2. User clicks "Continue".
3. **Validation:** Zod schema checks for exactly 4 digits.
4. **Action:** The app calls the simulated `verifyOtp` function (mock API call with 800ms delay). The "Continue" button enters a loading state (spinner).
5. **Result Handling:**
   - *Success (Mock always returns true):* Saves OTP to the Zustand `registrationStore`, triggers `onNext()` to advance to Step 4.
   - *Failure (If mock was extended to fail):* Triggers shake animation, shows error message, clears inputs.

---

### Step 4: Name Entry
**High-Level Design:**
- **Heading:** "What is your name?"
- **UI Elements:** Two standard text input fields stacked vertically for "First Name" and "Last Name".
- **Actions:** "Back" and "Continue".

**Submission Flow:**
1. User enters their First Name and Last Name.
2. User clicks "Continue".
3. **Validation:** Zod schema checks both fields (min 2 chars, letters only). Errors shown on blur.
4. **Action:** If valid, the values are saved to the Zustand `registrationStore` (`setField('firstName', val)`, `setField('lastName', val)`).
5. **Navigation:** Triggers `onNext()` to advance to Step 5.

---

### Step 5: Password Creation
**High-Level Design:**
- **Heading:** "Create Password for your account"
- **UI Elements:** 
  - "Enter new password" input field (with show/hide eye toggle).
  - Password strength indicator (4-segment progress bar with color-coding: red, amber, green).
  - Dynamic checklist of rules (e.g., "Must be at least 8 characters", uppercase, number) that check off live.
  - "Confirm password" input field (with show/hide eye toggle).
- **Actions:** "Back" and "Continue".

**Submission Flow:**
1. User enters a password. The strength meter and rule checklist update dynamically on every keystroke.
2. User re-enters the password in the confirm field.
3. User clicks "Continue".
4. **Validation:** Zod schema strictly validates password complexity (min 8 chars, 1 uppercase, 1 number) and uses `.refine()` to ensure `password === confirmPassword`.
5. **Action:** If valid, the password is saved to the Zustand `registrationStore` (`setField('password', value)`).
6. **Final Trigger:** Instead of advancing to a new route, `handleNext` determines this is the final step (`step === 5`) and changes the local state `setShowSuccess(true)`.

---

### Final: Success Modal Overlay
**High-Level Design:**
- **Overlay:** A semi-transparent dark backdrop (`bg-black/40`) covering the entire screen.
- **Modal Card:** A centered, white, rounded card that scales in (Framer Motion).
- **UI Elements:** 
  - A green checkmark icon in a circle.
  - "You're all set!" heading.
  - A summary list showing: Account Type, Name, and Masked Mobile Number (e.g., `97•••7290`).
  - A security badge ("Your account is secured with bank-grade security").
  - "Go To Dashboard" primary button.

**Submission Flow (Finalization):**
1. Modal mounts and automatically traps keyboard focus within its bounds.
2. The modal component reads the final, validated data directly from the Zustand `registrationStore` to populate the summary.
3. User clicks "Go To Dashboard".
4. **Action:** Currently a mock function. In a real application, this would dispatch the final complete data payload to the backend `POST /api/register` endpoint, clear the Zustand store on success, and perform a hard redirect to the authenticated dashboard route.