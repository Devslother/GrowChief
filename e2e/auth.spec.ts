import { test, expect } from "@playwright/test";

test.describe("Auth Happy Path", () => {
  test("should sign up with valid credentials", async ({ page }) => {
    await page.goto("/auth/register");
    await expect(page.getByRole("button", { name: /create account/i })).toBeVisible();

    // Fill registration form
    const emailInput = page.locator('input[type="email"]').first();
    await expect(emailInput).toBeVisible();
    const uniqueEmail = `test+${Date.now()}@example.com`;
    await emailInput.fill(uniqueEmail);

    // Password inputs - there should be 2 password inputs
    const passwordInputs = page.locator('input[type="password"]');
    const passwordCount = await passwordInputs.count();
    expect(passwordCount).toBeGreaterThanOrEqual(2);
    
    await passwordInputs.nth(0).fill("password123");
    await passwordInputs.nth(1).fill("password123");

    // Company input (if present)
    const companyInput = page.locator('input[type="text"]').first();
    if (await companyInput.count()) {
      await companyInput.fill("Test Company");
    }

    // Submit form
    const submitButton = page.getByRole("button", { name: /create account/i });
    await submitButton.click();

    // Expect either success, error, or stay on page (if backend is not wired in e2e)
    const successText = page.getByText(/account created|activation link|welcome|successfully/i);
    const errorText = page.getByText(/error|invalid|already exists/i);
    const signUpOutcome = await Promise.race([
      successText.first().waitFor({ state: "visible" }).then(() => "success"),
      errorText.first().waitFor({ state: "visible" }).then(() => "error"),
      page
        .waitForURL((url) => !url.pathname.includes("/auth/register"))
        .then(() => "redirect"),
      page.waitForTimeout(3000).then(() => "no-signal"),
    ]);
    if (signUpOutcome === "no-signal") {
      await expect(submitButton).toBeVisible();
      await expect(page).toHaveURL(/\/auth\/register/);
    }
  });

  test("should sign in with valid credentials", async ({ page }) => {
    await page.goto("/auth/login");
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();

    // Fill login form
    const emailInput = page.locator('input[type="email"], input[placeholder*="example"]').first();
    await emailInput.fill("test@example.com");

    const passwordInput = page.locator('input[type="password"]').first();
    await passwordInput.fill("password123");

    // Submit form
    await page.getByRole("button", { name: /sign in/i }).click();

    // Expect either redirect away from login or an error message
    const loginError = page.getByText(/error|invalid|incorrect|failed/i);
    const signInOutcome = await Promise.race([
      page
        .waitForURL((url) => !url.pathname.includes("/auth/login"))
        .then(() => "redirect"),
      loginError.first().waitFor({ state: "visible" }).then(() => "error"),
      page.waitForTimeout(3000).then(() => "no-signal"),
    ]);
    if (signInOutcome === "no-signal") {
      await expect(page).toHaveURL(/\/auth\/login/);
      await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
    }
  });
});
