import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly mainTitle: Locator;
  readonly dashboardButton: Locator;
  readonly heroesButton: Locator;
  readonly messagesTitle: Locator;
  readonly clearMessagesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainTitle = page.locator('h1', { hasText: 'Tour of Heroes' });
    this.dashboardButton = page.locator('a', { hasText: 'Dashboard' });
    this.heroesButton = page.locator('a', { hasText: 'Heroes' });
    this.messagesTitle = page.locator('h2', { hasText: 'Messages' });
    this.clearMessagesButton = page.locator('button.clear');
  }

  async navigateToDashboard() {
    await this.dashboardButton.first().click();
    await expect(this.page).toHaveURL(/.*dashboard/);
  }

  async navigateToHeroes() {
    await this.heroesButton.first().click();
    await expect(this.page).toHaveURL(/.*heroes/);
  }

  async clearMessages() {
    await this.clearMessagesButton.click();
  }
}
