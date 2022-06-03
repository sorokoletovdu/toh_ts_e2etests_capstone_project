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
    const detail = new Detail(page);
    const randomHero = await getRandomHero(heroes);
    const randomHeroText = await randomHero.textContent();
    const randomHeroId = randomHeroText?.split(' ')[0];

    // Check the hero id is in url
    await randomHero.click();
    await detail.checkDetailPageOpened();
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
    const randomHero = await getRandomHero(heroes);

    // Go to hero details
    await randomHero.click();
    await detail.checkDetailPageOpened();

    // Change the name
    await detail.changeHeroNane(NEW_REGULAR_HERO_NAME);

    // Check the new name is in the list
    await heroes.checkHeroesPageOpened();
    await heroes.heroesList.first().waitFor();
    await expect(
      heroes.heroesList.filter({ hasText: NEW_REGULAR_HERO_NAME })
    ).toBeVisible();

    // Go to the new hero details
    await heroes.heroesList.filter({ hasText: NEW_REGULAR_HERO_NAME }).click();
    await detail.checkDetailPageOpened();

    // Check the name is changed on the details page
    const newNameTitle = await detail.heroNameTitle.textContent();
    expect(newNameTitle?.split(' ')[0]).toBe(
      NEW_REGULAR_HERO_NAME.toUpperCase()
    );
  });

  test('name of the top hero should be saved after changes on blank and My Heroes page', async ({
    page,
  }) => {
    const heroes = new Heroes(page);
    const detail = new Detail(page);
    const dashboard = new Dashboard(page);

    // Go to dashboard page
    // Click on random top hero
    const randomTopHero = await getRandomTopHero(dashboard);

    // Go to hero details
    await randomTopHero.click();
    await detail.checkDetailPageOpened();

    // Change the name
    await detail.changeHeroNane(NEW_TOP_HERO_NAME);

    // Go to dashboard page
    // Check the new name is in the top heroes list
    await dashboard.checkDashboardPageOpened();
    await dashboard.topHeroesList.first().waitFor();
    await expect(
      dashboard.topHeroesList.filter({ hasText: NEW_TOP_HERO_NAME })
    ).toBeVisible();

    // Go to heroes page
    // Check the new name is in the all heroes list
    await dashboard.navigateToHeroes();
    await heroes.checkHeroesPageOpened();
    await heroes.heroesList.first().waitFor();
    await expect(
      heroes.heroesList.filter({ hasText: NEW_TOP_HERO_NAME })
    ).toBeVisible();

    // Go to the new hero details
    await heroes.heroesList.filter({ hasText: NEW_TOP_HERO_NAME }).click();
    await detail.checkDetailPageOpened();

    // Check the name is changed on the details page
    const newNameTitle = await detail.heroNameTitle.textContent();
    expect(newNameTitle?.split(' ')[0]).toBe(NEW_TOP_HERO_NAME.toUpperCase());
  });

  test('name of a random hero should be saved after searching a random hero and changing name', async ({
    page,
  }) => {
    const heroes = new Heroes(page);
    const dashboard = new Dashboard(page);
    const detail = new Detail(page);

    // Get a random hero
    const randomHero = await getRandomHero(heroes);
    // Get a random hero name
    const randomHeroText = await randomHero.textContent();
    const randomHeroName = randomHeroText?.split(' ')[1] as string;
    // Go to Dashboard
    await heroes.navigateToDashboard();
    await dashboard.checkDashboardPageOpened();
    // Search a hero by name given before
    await dashboard.searchHero(randomHeroName);
    // Go to hero details
    await detail.checkDetailPageOpened();

    // Change the name
    await detail.changeHeroNane(NEW_REGULAR_HERO_NAME);
    // Go to heroes page
    // Check the new name is in the all heroes list
    await dashboard.checkDashboardPageOpened();
    await dashboard.navigateToHeroes();
    await heroes.checkHeroesPageOpened();
    await heroes.heroesList.first().waitFor();
    await expect(
      heroes.heroesList.filter({ hasText: NEW_REGULAR_HERO_NAME })
    ).toBeVisible();
  });
});

test.describe('Heroes count', () => {
  test('number of heroes on My Heroes page should be 10', async ({ page }) => {
    const heroes = new Heroes(page);

    // Go to My Heroes page
    await heroes.navigateToHeroes();

    // Check count of heroes
    await heroes.checkHeroesPageOpened();
    await heroes.heroesList.first().waitFor();
    const heroesCount = await heroes.heroesList.count();
    expect(heroesCount).toBe(10);
  });
});

test.describe('The top hero section', () => {
  test('should displayed 4 heroes in "Top hero" section', async ({ page }) => {
    const dashboard = new Dashboard(page);

    // Go to Dashboard page
    await dashboard.navigateToDashboard();

    // Check count of top heroes
    await dashboard.checkDashboardPageOpened();
    await dashboard.topHeroesList.first().waitFor();
    const topHeroesCount = await dashboard.topHeroesList.count();
    expect(topHeroesCount).toBe(4);
  });
});

test.describe(
  'Add and Delete - five different heroes should added and deleted',
  () => {
    const newcommers = [
      'Batman',
      'Spiderman',
      'Superman',
      'Captain America',
      'Green Light',
    ];
    for (const newcommer of newcommers) {
      test(`A hero called ${newcommer} should be added and then deleted`, async ({
        page,
      }) => {
        const heroes = new Heroes(page);
        const detail = new Detail(page);

        // Go to My Heroes page
        await heroes.navigateToHeroes();
        await heroes.checkHeroesPageOpened();

        // Add a hero
        await heroes.addNewHero(newcommer);

        // Check the new hero is added and presented in the heroes list
        await heroes.checkHeroesPageOpened();
        await heroes.heroesList.first().waitFor();
        await expect(
          heroes.heroesList.filter({ hasText: newcommer })
        ).toBeVisible();

        // Delete a hero
        await heroes.deleteHero(newcommer);

        // Check the new hero is deleted and not presented in the heroes list
        await heroes.checkHeroesPageOpened();
        await heroes.heroesList.first().waitFor();
        await expect(
          heroes.heroesList.filter({ hasText: newcommer })
        ).not.toBeVisible();
      });
    }
  }
);

async function getRandomHero(heroes: Heroes) {
  await heroes.navigateToHeroes();
  await heroes.checkHeroesPageOpened();
  await heroes.heroesList.first().waitFor();
  const heroesCount = await heroes.heroesList.count();
  const randomHeroIndex = Math.floor(Math.random() * heroesCount);
  const randomHero = heroes.heroesList.nth(randomHeroIndex);
  return randomHero;
}

async function getRandomTopHero(dashboard: Dashboard) {
  await dashboard.navigateToDashboard();
  await dashboard.checkDashboardPageOpened();
  await dashboard.topHeroesList.first().waitFor();
  const topHeroesCount = await dashboard.topHeroesList.count();
  const randomTopHeroIndex = Math.floor(Math.random() * topHeroesCount);
  const randomTopHero = dashboard.topHeroesList.nth(randomTopHeroIndex);
  return randomTopHero;
}
