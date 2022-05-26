import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class Detail extends BasePage {
  readonly heroNameTitle: Locator;
  readonly heroId: Locator;
  readonly heroNameLabel: Locator;
  readonly heroNameInput: Locator;
  readonly goBackButton: Locator;
  readonly saveNameChangesButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heroNameTitle = page.locator('h2', { hasText: /.* Details/ });
    this.heroId = page.locator('div:has-text("id:") >> span');
    this.heroNameLabel = page.locator('label', { hasText: 'Hero name:' });
    this.heroNameInput = page.locator('id=hero-name');
    this.goBackButton = page.locator('button', { hasText: 'go back' });
    this.saveNameChangesButton = page.locator('button', { hasText: 'save' });
  }

  async changeHeroNane(newName: string) {
    await this.heroNameInput.click({ clickCount: 3 });
    await this.page.keyboard.press('Backspace');
    await this.heroNameInput.fill(newName);
    await this.saveNameChangesButton.click();
  }

  async goBackToHeroes() {
      await this.goBackButton.click();
  }
}
