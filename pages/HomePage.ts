// pages/HomePage.ts
import { type Page, type Locator, expect } from "@playwright/test";

export class HomePage {
  // Use readonly to ensure the page object is immutable

  // --- Locators ---
  readonly page: Page;
  readonly mainHeading: Locator;
  readonly heroBookNowButton: Locator;
  readonly bookingAvailabilityCardHeading: Locator;
  readonly checkInLabel: Locator;
  readonly checkOutLabel: Locator;
  readonly checkInTextbox: Locator;
  readonly checkOutTextBox: Locator;
  readonly checkAvailabilityButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainHeading = page.getByRole("heading", {
      name: "Welcome to Shady Meadows B&B",
    });
    this.heroBookNowButton = page.getByRole("link", {
      name: "Book Now",
      exact: true, //Other 'book now' links have slightly different name
    });
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
  }

  // --- Actions & Assertions ---
  async gotoHome() {
    await this.page.goto("/");
  }

  async assertPageTitleAndHeading() {
    await expect(this.page).toHaveTitle("Restful-booker-platform demo");
    await expect(this.mainHeading).toBeVisible();
  }

  async assertHeroBookNowButtonIsReady() {
    // Expect the primary booking button to be visible
    await expect(this.heroBookNowButton).toBeVisible();
    await expect(this.heroBookNowButton).toBeEnabled();
  }

  async assertBookingAvailabilityHeadingVisibility() {
    await expect(this.bookingAvailabilityCardHeading).toBeVisible();
  }

  async verifyDateFieldsAreVisible() {
    await expect(this.checkInLabel).toBeVisible();
    await expect(this.checkOutLabel).toBeVisible();
    await expect(this.checkInTextbox).toBeVisible();
    await expect(this.checkOutTextBox).toBeVisible();
  }

  async checkAvailabilityButtonVisibleAndEnabled() {
    await expect(this.checkAvailabilityButton).toBeVisible();
    await expect(this.checkAvailabilityButton).toBeEnabled();
  }

  async assertStatus(status: unknown) {
    // Navigate to the URL and capture the response
    const response = await this.page.goto("/");
    // Assert that the response is not null and the status is 200 (OK)
    expect(response?.status()).toBe(status);
  }
}
