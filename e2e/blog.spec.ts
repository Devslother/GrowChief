import { test, expect } from "@playwright/test";

test.describe("Blog", () => {
  test("should open post by slug, check title and author card", async ({
    page,
  }) => {
    await page.goto("/blog");
    await expect(page).toHaveURL(/\/blog/);

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

    const postTitle = page.getByRole("heading", { level: 2 }).first();
    await expect(postTitle).toBeVisible();
    await expect(postTitle).not.toBeEmpty();

    // Check author info is present (AuthorCard container)
    const authorCard = page.locator(".author-card-border").first();
    await expect(authorCard).toBeVisible();

    const authorName = authorCard.locator("h3").first();
    await expect(authorName).toBeVisible();
    await expect(authorName).not.toBeEmpty();

    const authorAvatar = authorCard.locator("img[alt]").first();
    await expect(authorAvatar).toBeVisible();
  });
});
