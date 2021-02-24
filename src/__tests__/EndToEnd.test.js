
import puppeteer from 'puppeteer';
import Config from '../config';
// import { mockData } from '../mock-data';
 // no need for enzyme because the browser is what renders React components

describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 200,
      ignoreDefaultArgs: ['--disable-extensions'],
    });
    page = await browser.newPage();
    await page.goto(Config.LOCAL_HOST)
    await page.waitForSelector('.Event');
  });

  afterAll(() => {
    browser.close();
  });

    test('An event element is collapsed by default', async () => {
      const eventDetails = await page.$('.Event .event-expanded');
      expect(eventDetails).toBeNull();
  });

    test('User can expand an event to see its details', async () => {
      await page.click('.Event .details-btn');

      const eventDetails = await page.$('.Event .event-expanded');
      expect(eventDetails).toBeDefined();
  });

    test('User can collapse an event to hide its details', async () => {
      await page.click('.Event .details-btn');
      const eventDetails = await page.$('.Event .event-expanded');
      expect(eventDetails).toBeNull();
  });

})

// describe('filter events by city', () => {
//   let browser;
//   let page;
//   beforeAll(async () => {
//     jest.setTimeout(30000);
//     browser = await puppeteer.launch({
//       // headless: false,
//       // slowMo: 200,
//       ignoreDefaultArgs: ['--disable-extensions']
//     });
//     page = await browser.newPage();
//     await page.goto(Config.LOCAL_HOST)
//     await page.waitForSelector('.Event');
//   });

//   afterAll(() => {
//     browser.close();
//   });

//   test('When user has not searched for city, show upcoming events from all cities', async () => {
//     const citySelector = await page.$('.Event');
//     expect(citySelector).toHaveLength(mockData.length);
//   });

//   test('User should see list of suggestions when they search for a city', async () => {
//     const citySelector = await page.$('.city');
//     citySelector.click('input .city')
//   })

//   test('User can select a city from suggested list', async () => {
//     const 
//   })
// })