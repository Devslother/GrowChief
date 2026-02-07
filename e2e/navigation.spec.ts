import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate: home → docs → blog → article", async ({ page }) => {
    await test.step("Open home", async () => {
      await page.goto("/");
      await expect(page).toHaveURL("/");
      await expect(page.locator("header")).toBeVisible();
    });

    await test.step("Navigate to docs", async () => {
      const docsLink = page.getByRole("link", { name: /DevelopersDocs|docs/i }).first();
      await expect(docsLink).toBeVisible();
      await docsLink.click();
      await expect(page).toHaveURL(/\/docs/);
    });

    await test.step("Back to home", async () => {
      await page.goto("/");
      await expect(page).toHaveURL("/");
      await expect(page.locator("header")).toBeVisible();
    });

    await test.step("Navigate to blog", async () => {
      const blogLink = page.getByRole("link", { name: /blog/i }).first();
      await expect(blogLink).toBeVisible();
      await blogLink.click();
      await expect(page).toHaveURL(/\/blog/);
    });

    await test.step("Open first blog article", async () => {
      const article = page.locator("article").first();
      await expect(article).toBeVisible();

      const articleLink = article.locator(
        "a[href^='/blog/']:not([href='/blog']):not([href='/blog/'])"
      ).first();

      await expect(articleLink).toBeVisible();
      await expect(articleLink).toHaveAttribute("href", /\/blog\/[^/]+$/);

      await Promise.all([
        page.waitForURL(/\/blog\/[^/]+/),
        articleLink.click(),
      ]);

      await expect(page).toHaveURL(/\/blog\/[^/]+/);
    });
  });
});
