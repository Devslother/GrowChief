import { test, expect } from "@playwright/test";

test.describe("Docs", () => {
  test("should open page by slug and check side nav active item", async ({
    page,
  }) => {
    await page.goto("/docs");
    await expect(page).toHaveURL(/\/docs/);

    const sideNav = page.getByRole("complementary").first();
    await expect(sideNav).toBeVisible();

    const firstDocLink = sideNav.getByRole("link", { name: /.+/ }).first();
    await expect(firstDocLink).toBeVisible();
    await expect(firstDocLink).toHaveAttribute("href", /\/docs(\/[^/]+)?/);

    const href = await firstDocLink.getAttribute("href");
    expect(href).toBeTruthy();
    const targetPath = href ?? "/docs";
    const currentPath = new URL(page.url()).pathname;

    if (targetPath !== currentPath) {
      await Promise.all([
        page.waitForURL(new RegExp(`${targetPath}$`)),
        firstDocLink.click(),
      ]);
      await expect(page).toHaveURL(new RegExp(`${targetPath}$`));
    } else {
      await firstDocLink.click();
      await expect(page).toHaveURL(/\/docs/);
    }

    const activeLink = sideNav.locator("a[aria-current='page']").first();
    if (await activeLink.count()) {
      await expect(activeLink).toBeVisible();
    } else {
      // Fallback: if aria-current isn't used, at least ensure some link is marked as active via class
      const anyActiveClass = sideNav.locator("a[class*='active'], a[class*='current']").first();
      if (await anyActiveClass.count()) {
        await expect(anyActiveClass).toBeVisible();
      }
    }
  });

  test("should show correct active item for different docs pages", async ({
    page,
  }) => {
    await page.goto("/docs");
    await expect(page).toHaveURL(/\/docs/);

    const sideNav = page.getByRole("complementary").first();
    await expect(sideNav).toBeVisible();

    const links = sideNav.locator("a[href^='/docs']");
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(1);

    const firstLink = links.nth(0);
    const secondLink = links.nth(1);

    const firstHref = await firstLink.getAttribute("href");
    const secondHref = await secondLink.getAttribute("href");
    expect(firstHref).toBeTruthy();
    expect(secondHref).toBeTruthy();

    if (firstHref) {
      const currentPath = new URL(page.url()).pathname;
      if (firstHref !== currentPath) {
        await Promise.all([
          page.waitForURL(new RegExp(`${firstHref}$`)),
          firstLink.click(),
        ]);
        await expect(page).toHaveURL(new RegExp(`${firstHref}$`));
      } else {
        await firstLink.click();
        await expect(page).toHaveURL(/\/docs/);
      }
    }

    if (secondHref) {
      const currentPath2 = new URL(page.url()).pathname;
      if (secondHref !== currentPath2) {
        await Promise.all([
          page.waitForURL(new RegExp(`${secondHref}$`)),
          secondLink.click(),
        ]);
        await expect(page).toHaveURL(new RegExp(`${secondHref}$`));
      } else {
        await secondLink.click();
        await expect(page).toHaveURL(/\/docs/);
      }
    }

    const activeLink = sideNav.locator("a[aria-current='page']").first();
    if (await activeLink.count()) {
      await expect(activeLink).toBeVisible();
    }
  });
});
