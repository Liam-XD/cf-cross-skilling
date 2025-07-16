import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  console.log("Before running each test...");
  await page.goto("https://automationintesting.online/");
});

test.describe("Verify page load status and her section elements", () => {
  test("should load the page and return a 200 status code", async ({
    page,
  }) => {
    // Navigate to the URL and capture the response
    const response = await page.goto("https://automationintesting.online/");

    // Assert that the response is not null and status is 200
    expect(response && response.status()).toBe(200);
  });

  test("heading present", async ({ page }) => {
    // Expect a heading "to be present with expected wording
    await expect(
      page.getByRole("heading", { name: "Welcome to Shady Meadows B&B" })
    ).toBeVisible();
  });

  test("homepage hero image should be present", async ({ page }) => {
    const heroImage = page.locator([rbp - logo.jpg]);
    await expect(heroImage, "The hero image should be visible").toBeVisible();
  });

  test("'Book Now' button present", async ({ page }) => {
    // Expect 'Book Now' button to be present
    expect(page.getByRole("link", { name: "Book Now", exact: true }))
      .toBeVisible;
  });
});
