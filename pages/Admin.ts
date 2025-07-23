import { type Page, type Locator, expect } from "@playwright/test";

export class Admin {
  readonly page: Page;
  // --- Locators ---
  readonly loginHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    //--- Login page ---
    this.loginHeading = page.getByRole("heading", { name: "Login" });
  }
}
