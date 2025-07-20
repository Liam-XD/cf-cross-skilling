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

    await test.step("Verify page title & Heading is correct", async () => {
      await homePage.assertPageTitleAndHeading();
    });

    await test.step('Verify "Book this room" button is present', async () => {
      // Expect the primary booking button to be visible
      await homePage.assertHeroBookNowButtonIsReady();
    });
  });
});

test.describe("Booking Section Verification", () => {
  test("Verify Booking Availability card elements", async ({ page }) => {
    await test.step("Verify Card Heading", async () => {
      await homePage.assertBookingAvailabilityHeadingVisibility();
    });

    await test.step("Verify Check-in and Check-out fields", async () => {
      await homePage.verifyDateFieldsAreVisible();
    });

    await test.step("Verify 'Check Availability' button is present and clickable", async () => {
      await homePage.checkAvailabilityButtonVisibleAndEnabled();
    });
  });
});
