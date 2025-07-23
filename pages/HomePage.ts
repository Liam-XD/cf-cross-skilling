// pages/HomePage.ts
import { type Page, type Locator, expect } from "@playwright/test";

export class HomePage {
  // Using 'readonly' to ensure the page object is immutable

  // --- Locators ---
  readonly page: Page;

  //Hero
  readonly mainHeading: Locator;
  readonly heroBookNowButton: Locator;
  readonly bookingAvailabilityCardHeading: Locator;

  //Availability Card
  readonly checkInLabel: Locator;
  readonly checkOutLabel: Locator;
  readonly checkInTextbox: Locator;
  readonly checkOutTextBox: Locator;
  readonly checkAvailabilityButton: Locator;

  //Navigation Bar
  readonly homePageNavLink: Locator;
  readonly roomsNavLink: Locator;
  readonly bookingNavLink: Locator;
  readonly amenitiesNavLink: Locator;
  readonly locationNavLink: Locator;
  readonly contactNavLink: Locator;
  readonly adminNavLink: Locator;

  //Rooms section
  readonly roomsHeading: Locator;

  //Location section
  readonly locationHeading: Locator;

  //Contact form section
  readonly contactFormHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    //Hero Section
    this.mainHeading = page.getByRole("heading", {
      name: "Welcome to Shady Meadows B&B",
    });
    this.heroBookNowButton = page.getByRole("link", {
      name: "Book Now",
      exact: true, //Other 'book now' links have slightly different name
    });

    //Check Availability Section
    this.bookingAvailabilityCardHeading = page.getByRole("heading", {
      name: "Check Availability & Book",
    });
    this.checkInLabel = page.getByText("Check In", { exact: true });
    this.checkOutLabel = page.getByText("Check Out", { exact: true });
    this.checkInTextbox = page
      .locator("div")
      .filter({ hasText: /^Check In$/ })
      .getByRole("textbox");
    this.checkOutTextBox = page
      .locator("div")
      .filter({ hasText: /^Check Out$/ })
      .getByRole("textbox");
    this.checkAvailabilityButton = page.getByRole("button", {
      name: "Check Availability",
    });

    //Navigation Bar
    this.homePageNavLink = page.getByRole("link", {
      //No specific locator
      name: "Shady Meadows B&B",
      exact: true,
    });
    this.roomsNavLink = page
      .locator("#navbarNav")
      .getByRole("link", { name: "Rooms" });
    this.bookingNavLink = page
      .locator("#navbarNav")
      .getByRole("link", { name: "Booking" });
    this.amenitiesNavLink = page.getByRole("link", {
      //No specific locator
      name: "Amenities",
      exact: true,
    });
    this.locationNavLink = page.getByRole("link", {
      //No specific locator
      name: "Location",
      exact: true,
    });
    this.contactNavLink = page
      .locator("#navbarNav")
      .getByRole("link", { name: "Contact" });
    this.adminNavLink = page.getByRole("link", {
      //No specific locator
      name: "Admin",
      exact: true,
    });

    //Rooms section
    this.roomsHeading = page.getByRole("heading", { name: "Our Rooms" });

    //Location section
    this.locationHeading = page.getByRole("link", { name: "Location" });

    //Contact form section
    this.contactFormHeading = page.getByRole("heading", {
      name: "Send Us a Message",
    });
  }

  // --- Actions & Assertions ---
  async gotoHome() {
    await this.page.goto("/");
  }

  async checkPageTitleAndHeading() {
    await expect(this.page).toHaveTitle("Restful-booker-platform demo");
    await expect(this.mainHeading).toBeVisible();
  }

  async checkHeroBookNowButtonIsReady() {
    // Expect the primary booking button to be visible
    await expect(this.heroBookNowButton).toBeVisible();
    await expect(this.heroBookNowButton).toBeEnabled();
  }

  async checkForBookingAvailabilityHeading() {
    await expect(this.bookingAvailabilityCardHeading).toBeVisible();
  }

  async verifyDateFieldsAreVisible() {
    await expect(this.checkInLabel).toBeVisible();
    await expect(this.checkOutLabel).toBeVisible();
    await expect(this.checkInTextbox).toBeVisible();
    await expect(this.checkOutTextBox).toBeVisible();
  }

  async checkAvailabilityButtonIsReady() {
    await expect(this.checkAvailabilityButton).toBeVisible();
    await expect(this.checkAvailabilityButton).toBeEnabled();
  }

  async checkNavigationBarLinksAreVisible() {
    // Using Promise.all to run assertions in parallel for a minor speed boost
    await Promise.all([
      expect(this.roomsNavLink).toBeVisible(),
      expect(this.bookingNavLink).toBeVisible(),
      expect(this.amenitiesNavLink).toBeVisible(),
      expect(this.locationNavLink).toBeVisible(),
      expect(this.contactNavLink).toBeVisible(),
      expect(this.adminNavLink).toBeVisible(),
    ]);
  }

  async checkStatus(status: unknown) {
    // Navigate to the URL and capture the response
    const response = await this.page.goto("/");
    // Assert that the response is not null and the status is 200 (OK)
    expect(response?.status()).toBe(status);
  }
}
