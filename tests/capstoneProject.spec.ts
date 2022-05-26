import { test, expect, Page } from '@playwright/test';
import { Dashboard } from './pages/dashboard';
import { Heroes } from './pages/heroes';
import { Detail } from './pages/detail';
import { BasePage } from './pages/basePage';

const APP_URL = 'http://localhost:4200/';

const NEW_REGULAR_HERO_NAME = 'Ahiles';
const NEW_TOP_HERO_NAME = 'Gerakl';

test.beforeEach(async ({ page }) => {
  await page.goto(APP_URL);
});

test.describe('Hero ID', () => {
  test('id of the hero should be equal id in the url on hero detailed page', async ({
    page,
  }) => {
    // Get the random hero from the heroes list on My Heroes page

    const heroes = new Heroes(page);
    const randomHero = await getRandomHeroe(heroes);
    const randomHeroText = await randomHero.textContent();
    const randomHeroId = randomHeroText?.split(' ')[0];

    // Check the hero id is in url
    await randomHero.click();
    expect(page.url()).toBe(`${APP_URL}detail/${randomHeroId}`);
  });
});

test.describe('Change the hero name', () => {
  test('name of the regular hero should be saved after changes on blank and My Heroes page', async ({
    page,
  }) => {
    const heroes = new Heroes(page);
    const detail = new Detail(page);

    // Get the random hero from the heroes list on My Heroes page
    const randomHero = await getRandomHeroe(heroes);

    // Go to hero details
    await randomHero.click();
    
    // Change the name
    await detail.changeHeroNane(NEW_REGULAR_HERO_NAME);

    // Check the new name is in the list
    await heroes.heroesList.first().waitFor();
    await expect(heroes.heroesList.filter({hasText: NEW_REGULAR_HERO_NAME})).toBeVisible();

    // Go to the new hero details
    await heroes.heroesList.filter({hasText: NEW_REGULAR_HERO_NAME}).click();

    // Check the name is changed on the details page
    const newNameTitle = await detail.heroNameTitle.textContent();
    expect(newNameTitle?.split(' ')[0]).toBe(
      NEW_REGULAR_HERO_NAME.toUpperCase()
    );
  });

  test('name of the top hero should be saved after changes on blank and My Heroes page', async ({
    page,
  }) => {
    // Go to dashboard page
    // Click on random top hero
    // Go to hero details
    // Change the name
    // Check the name is changed on the details page
    // Go to heroes page
    // Check the new name is in the all heroes list
    // Go to dashboard page
    // Check the new name is in the top heroes list
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

async function getRandomHeroe(heroes: Heroes) {
  await heroes.navigateToHeroes();
  await heroes.heroesList.first().waitFor();
  const heroesCount = await heroes.heroesList.count();
  const randomHeroIndex = Math.floor(Math.random() * heroesCount);
  const randomHero = heroes.heroesList.nth(randomHeroIndex);
  return randomHero;
}
