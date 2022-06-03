import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class Dashboard extends BasePage {
  readonly topHeroesTitle: Locator;
  readonly topHeroesList: Locator;
  readonly heroSearchLabel: Locator;
  readonly heroSearchInput: Locator;
  readonly heroSearchResult: Locator;

  constructor(page: Page) {
    super(page);
    this.topHeroesTitle = page.locator('h2', { hasText: 'Top Heroes' });
    this.topHeroesList = page.locator('.heroes-menu a');
    this.heroSearchLabel = page.locator('label', { hasText: 'Hero Search' });
    this.heroSearchInput = page.locator('#search-box');
    this.heroSearchResult = page.locator('.search-result li');
  }

  async chooseTheTopHero(name: string) {
      await this.topHeroesList.filter({hasText: `${name}`}).click();
  }

  async searchHero(name: string) {
    await this.heroSearchInput.fill(name);
    await this.heroSearchResult.first().click();
  }

  async checkDashboardPageOpened() {
    await expect(this.page).toHaveURL(/.*dashboard/);
  }

}
