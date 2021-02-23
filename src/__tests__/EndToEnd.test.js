
import puppeteer from 'puppeteer';
 // no need for enzyme because the browser is what renders React components

describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      ignoreDefaultArgs: ['--disable-extensions']
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/')
    await page.waitForSelector('.Event');
  });

  afterAll(() => {
    browser.close();
  });

    test('An event element is collapsed by default', async () => {
      await page.waitForSelector('.Event');

      const eventDetails = await page.$('.Event .event-expanded');
      expect(eventDetails).toBeNull();
  });

    test('User can expand an event to see its details', async () => {
      await page.waitForSelector('.Event');
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