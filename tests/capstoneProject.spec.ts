import { test, expect, Page } from '@playwright/test';
import { Dashboard } from './pages/dashboard';
import { Heroes } from './pages/heroes';
import { Detail } from './pages/detail';
import { BasePage } from './pages/basePage';

const APP_URL = 'http://localhost:4200/';

test.beforeEach(async ({ page }) => {
  await page.goto(APP_URL);
});

test.describe('Hero ID', () => {
  test('id of the hero should be equal id in the url on hero detailed page', async ({page}) => {
    // Get the first hero from the heroes list on My Heroes page

    const basePage = new BasePage(page);
    const heroes = new Heroes(page);

    await basePage.navigateToHeroes();
    await heroes.heroesList.first().waitFor();
    const heroesCount = await heroes.heroesList.count();
    const randomHeroIndex = Math.floor(Math.random() * heroesCount);
    const randomHero = heroes.heroesList.nth(randomHeroIndex);
    const randomHeroText = await randomHero.textContent();
    const randomHeroId = randomHeroText?.split(' ')[0];

    // Check the hero id is in url
    await randomHero.click();
    expect(page.url()).toBe(`${APP_URL}detail/${randomHeroId}`);
  });
});

test.describe('Change the hero name', () => {
  test('name of the hero should be saved after changes on blank and My Heroes page', async ({
    page,
  }) => {
    // fsfs
  });
});

test.describe('Heroes count', () => {
  test('number of heroes on My Heroes page should be 10', async ({ page }) => {
    // ffgg
  });
});

test.describe('The top hero section', () => {
  test('should displayed 4 heroes in "Top hero" section', async ({ page }) => {
    // gfgdg
  });
});

test.describe('Add and Delete', () => {
  test('five different heroes should added and deleted', async ({ page }) => {
    //ytyt
  });
});
