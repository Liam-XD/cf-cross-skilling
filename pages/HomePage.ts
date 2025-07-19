// pages/HomePage.ts
import { type Page, type Locator, expect } from "@playwright/test";

export class HomePage {
  // Use readonly to ensure the page object is immutable
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoHome() {
    await this.page.goto("/");
  }

  async assertStatus(status) {
    // Navigate to the URL and capture the response
    const response = await this.page.goto("/");
    // Assert that the response is not null and the status is 200 (OK)
    expect(response?.status()).toBe(status);
  }
}
