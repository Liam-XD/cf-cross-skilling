import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage.ts";

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.gotoHome();
});

test.describe("Hero Section Verification", () => {
  test("Should load the homepage and display all hero section elements", async ({
    page,
  }) => {
    await test.step("Load page and verify status code", async () => {
      await homePage.assertStatus(200);
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

test.describe("Booking Section Verification", () => {
  test("Verify Booking card elements & functionality2", async ({ page }) => {
    await test.step("Verify Card Heading", async () => {
      await expect(
        page.getByRole("heading", { name: "Check Availability & Book" })
      ).toBeVisible();
      await page.pause();
    });

    await test.step("Verify Check-in and Check-out fields", async () => {
      await expect(page.getByText("Check In")).toBeVisible();
      await expect(page.getByText("Check Out")).toBeVisible();
      await expect(
        page
          .locator("div")
          .filter({ hasText: /^Check In$/ })
          .getByRole("textbox")
      ).toBeVisible();
      await expect(
        page
          .locator("div")
          .filter({ hasText: /^Check Out$/ })
          .getByRole("textbox")
      ).toBeVisible();
    });

    await test.step("Verify 'Check Availability' button is present and clickable", async () => {
      await page.pause();
      await expect(
        page.getByRole("button", { name: "Check Availability" })
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Check Availability" })
      ).toBeEnabled();
    });
  });
});
