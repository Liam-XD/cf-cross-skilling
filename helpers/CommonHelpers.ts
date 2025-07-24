import { type Page, type Locator, expect } from "@playwright/test";

export class CommonHelpers {
  // --- Locators ---
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // --- Actions & Assertions ---

  async waitForScrollEnd(timeout: number = 150) {
    await this.page.evaluate(
      (scrollTimeout) => {
        return new Promise((resolve) => {
          let timeoutId: NodeJS.Timeout;

          const scrollListener = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(resolve, scrollTimeout);
          };

          // Start listening for scroll events
          window.addEventListener("scroll", scrollListener);

          // Set an initial timeout to resolve if no scrolling is happening
          timeoutId = setTimeout(resolve, scrollTimeout);
        });
      },
      timeout // Pass the timeout value into the browser's context
    );
  }

  async checkStatus(status: unknown) {
    // Navigate to the URL and capture the response
    const response = await this.page.goto("/");
    // Assert that the response is not null and the status is 200 (OK)
    expect(response?.status()).toBe(status);
  }
}
