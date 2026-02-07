import { test, expect } from "@playwright/test";

test.describe("Anchor Scroll", () => {
  test("should scroll to pricing section when clicking /#pricing link", async ({
    page,
  }) => {
    await page.goto("/");

    // Find and click the pricing link in the header/nav
    const header = page.locator("header");
    const pricingLink = header.getByRole("link", { name: /pricing/i }).first();
    await expect(pricingLink).toBeVisible();
    await pricingLink.click();

    // Wait for URL to update with hash
    await expect(page).toHaveURL(/#pricing/);

    // Check that pricing section is in viewport
    const pricingSection = page.locator("#pricing");
    await expect(pricingSection).toBeVisible();

    // Verify the section is actually in the viewport
    await expect(pricingSection).toBeInViewport();

    // Verify section content is visible
    await expect(pricingSection.getByText(/subscription plans/i)).toBeVisible();
  });
});
