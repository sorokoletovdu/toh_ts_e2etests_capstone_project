import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class Dashboard extends BasePage {
  readonly topHeroesTitle: Locator;
  readonly topHeroesMenu: Locator;
  readonly heroSearchLabel: Locator;
  readonly heroSearchInput: Locator;
  readonly heroSearchResult: Locator;

  constructor(page: Page) {
    super(page);
    this.topHeroesTitle = page.locator('h2', { hasText: 'Top Heroes' });
    this.topHeroesMenu = page.locator('.heroes-menu');
    this.heroSearchLabel = page.locator('label', { hasText: 'Hero Search' });
    this.heroSearchInput = page.locator('#search-box');
    this.heroSearchResult = page.locator('#search-component > ul > li');
  }

  async chooseTheTopHero(name: string) {
    await this.page.locator(`${this.topHeroesMenu} :text("${name}")`).click();
  }

  async searchHero(name: string) {
    await this.heroSearchInput.fill(name);
    const resultsCount: number = await this.heroSearchResult.count();
    switch (resultsCount) {
      case 1:
        await this.heroSearchResult.nth(0).click();
        break;
      case 0:
        throw new Error(`The name=${name} is NOT found!`);
      default:
        throw new Error(`More than one result is found!`);
    }
  }
}
