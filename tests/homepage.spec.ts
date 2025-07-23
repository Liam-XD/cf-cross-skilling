import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage.ts";
import { CommonHelpers } from "../helpers/CommonHelpers.ts";
import { Admin } from "../pages/Admin.ts";

let homePage: HomePage;
let helper: CommonHelpers;
let admin: Admin;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  helper = new CommonHelpers(page);
  await homePage.gotoHome();
});

test.describe("Hero Section Tests", () => {
  test("Should load the homepage and display all hero section elements", async ({
    page,
  }) => {
    await test.step("Load page and verify status code", async () => {
      //await homePage.checkStatus(200);
      await helper.checkStatus(200);
    });

    await test.step("Verify page title & Heading is correct", async () => {
      await homePage.checkPageTitleAndHeading();
    });

    await test.step('Verify "Book this room" button is present', async () => {
      // Expect the primary booking button to be visible
      await homePage.checkHeroBookNowButtonIsReady();
    });
  });
});

test.describe("Booking Section Tests", () => {
  test("Verify Booking Availability card elements", async ({ page }) => {
    await test.step("Verify Card Heading", async () => {
      await homePage.checkForBookingAvailabilityHeading();
    });

    await test.step("Verify Check-in and Check-out fields", async () => {
      await homePage.verifyDateFieldsAreVisible();
    });

    await test.step("Verify 'Check Availability' button is present and clickable", async () => {
      await homePage.checkAvailabilityButtonIsReady();
    });
  });
});

test.describe("Navigation bar Tests", () => {
  test("Check visibility of navigation bar elements", async ({ page }) => {
    await test.step("Verify visibilty of Home link", async () => {
      await expect(homePage.homePageNavLink).toBeVisible();
    });
    await test.step("Verify visibility of navigation links", async () => {
      await homePage.checkNavigationBarLinksAreVisible();
    });
  });

  test("Home link should navigate to homepage", async ({ page }) => {
    // Click the Home link to navigate to the homepage
    await homePage.homePageNavLink.click();
    await expect(page).toHaveURL("https://automationintesting.online/");
    await expect(homePage.mainHeading).toBeInViewport();
  });

  test("Rooms link should navigate to Rooms section", async ({ page }) => {
    await expect(homePage.roomsHeading).not.toBeInViewport();
    await homePage.roomsNavLink.click();
    await helper.waitForScrollEnd(page);
    await expect(page).toHaveURL("https://automationintesting.online/#rooms");
    await expect(homePage.roomsHeading).toBeInViewport();
  });

  test.fail(
    "Booking link should navigate to Availability section",
    async ({ page }) => {
      //Will fail as page scrolls past the heading
      await expect(
        homePage.bookingAvailabilityCardHeading
      ).not.toBeInViewport();
      await homePage.bookingNavLink.click();
      await helper.waitForScrollEnd(page);
      await expect(page).toHaveURL(
        "https://automationintesting.online/#booking"
      );
      await expect(homePage.bookingAvailabilityCardHeading).toBeInViewport();
    }
  );

  test.skip("Amenities section not yet built", async ({ page }) => {
    await homePage.amenitiesNavLink.click();
    await expect(page).toHaveURL(
      "https://automationintesting.online/#amenities"
    );
    //There is no ameities section in the website so this link is redundant
  });

  test("Location link should navigate to location section", async ({
    page,
  }) => {
    await expect(homePage.locationHeading).not.toBeInViewport();
    await homePage.locationNavLink.click();
    await helper.waitForScrollEnd(page);
    await expect(page).toHaveURL(
      "https://automationintesting.online/#location"
    );
    await expect(homePage.locationHeading).toBeInViewport();
  });

  test("Contact link should navigate to contact-form section", async ({
    page,
  }) => {
    await expect(homePage.contactFormHeading).not.toBeInViewport();
    await homePage.contactNavLink.click();
    await helper.waitForScrollEnd(page);
    await expect(page).toHaveURL("https://automationintesting.online/#contact");
    await expect(homePage.contactFormHeading).toBeInViewport();
  });

  test("Admin link should navigate to Admin login page", async ({ page }) => {
    admin = new Admin(page);
    await homePage.adminNavLink.click();
    await expect(page).toHaveURL("https://automationintesting.online/admin");
    await expect(admin.loginHeading).toBeVisible();
  });
});
