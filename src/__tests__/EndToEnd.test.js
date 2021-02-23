
import puppeteer from 'puppeteer';
 // no need for enzyme because the browser is what renders React components

describe('show/hide an event details', () => {
    test('An event element is collapsed by default', async () => {
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser'
    })

    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');

    await page.waitForSelector('.Event');

    const eventDetails = await page.$('.Event .event-expanded');
    expect(eventDetails).toBeNull();
    browser.close();
  });

})