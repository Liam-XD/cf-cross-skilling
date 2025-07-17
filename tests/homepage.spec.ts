import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  console.log("Before running each test...");
  await page.goto("https://automationintesting.online/");
});

test.describe("Homepage Hero Section Verification", () => {
  test("Should load the homepage and display all hero section elements", async ({
    page,
  }) => {
    await test.step("Load page and verify status code", async () => {
      // Navigate to the URL and capture the response
      const response = await page.goto("https://automationintesting.online/");
      // Assert that the response is not null and the status is 200 (OK)
      expect(response?.status()).toBe(200);
    });

    await test.step("Verify page title is correct", async () => {
      await expect(page).toHaveTitle("Restful-booker-platform demo");
    });

    await test.step("Verify main heading is visible", async () => {
      // Expect the main heading to be visible with the correct text
      const heading = page.getByRole("heading", {
        name: "Welcome to Shady Meadows B&B",
      });
      await expect(heading).toBeVisible();
    });

    await test.step('Verify "Book this room" button is present', async () => {
      // Expect the primary booking button to be visible
      const bookButton = page.getByRole("link", {
        name: "Book Now",
        exact: true, //Other 'book now' links have slightly different name
      });
      await expect(bookButton).toBeVisible();
    });
  });
});

// test.describe("Verify page load status and hero section elements", () => {
//   test("should load the page and return a 200 status code", async ({
//     page,
//   }) => {
//     // Navigate to the URL and capture the response
//     const response = await page.goto("https://automationintesting.online/");

//     // Assert that the response is not null and status is 200
//     expect(response && response.status()).toBe(200);
//   });

//   test("heading present", async ({ page }) => {
//     // Expect a heading "to be present with expected wording
//     await expect(
//       page.getByRole("heading", { name: "Welcome to Shady Meadows B&B" })
//     ).toBeVisible();
//   });

//   test.only("homepage hero image should be present", async ({ page }) => {
//     const heroImage = page.locator("section.hero");
//     //make sure hero image is visible
//     await expect(heroImage).toBeVisible();
//     //make sure css has correct image URL
//     await expect(heroImage).toHaveCSS(
//       "background-image",
//       /url\(.*\/images\/rbp-logo\.jpg"\)/
//     );
//   });

//   test("'Book Now' button present", async ({ page }) => {
//     // Expect 'Book Now' button to be present
//     expect(page.getByRole("link", { name: "Book Now", exact: true }))
//       .toBeVisible;
//   });
// });
