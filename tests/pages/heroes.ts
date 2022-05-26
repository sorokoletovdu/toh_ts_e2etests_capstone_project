import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class Heroes extends BasePage {
  readonly myHeroesTitle: Locator;
  readonly newHeroNameLabel: Locator;
  readonly newHeroNameInput: Locator;
  readonly addButton: Locator;
  readonly heroesList: Locator;
  readonly heroBadge: Locator;
  readonly deleteHeroButton: Locator;

  constructor(page: Page) {
    super(page);
    this.myHeroesTitle = page.locator('h2', { hasText: 'My Heroes' });
    this.newHeroNameLabel = page.locator('label', { hasText: 'Hero name:' });
    this.newHeroNameInput = page.locator('#new-hero');
    this.addButton = page.locator('.add-button');
    this.heroesList = page.locator('.heroes li');
    this.heroBadge = page.locator('.badge');
    this.deleteHeroButton = page.locator('.delete');
  }

  async addNewHero(name: string) {
      await this.newHeroNameInput.fill(name);
      await this.addButton.click();
  }

  async deleteHero(name: string) {
      await this.page.locator(`.heroes:has-text("${name}") >> button`).click();
  }
}
