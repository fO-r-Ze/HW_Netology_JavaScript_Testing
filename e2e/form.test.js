import puppeteer from 'puppeteer';

const APP_URL = process.env.APP_URL || 'http://localhost:9000';

describe('Credit Card Form (e2e)', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: process.env.CI === 'true' ? true : false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(APP_URL, { waitUntil: 'networkidle0' });
  });

  afterEach(async () => {
    await page.close();
  });

  test('form renders on page start', async () => {
    await page.waitForSelector('.card-form-widget');
    const label = await page.$eval('.card-form-widget label', (el) => el.textContent);
    expect(label).toContain('карты');
  });

  test('valid card number gets .valid class and success message', async () => {
    await page.type('.card-form-widget .input', '4111111111111111');
    await page.click('.card-form-widget .submit');

    await page.waitForSelector('.card-form-widget .input.valid');
    expect(await page.$('.card-form-widget .input.valid')).toBeTruthy();

    const resultText = await page.$eval('.result', (el) => el.textContent);
    expect(resultText).toContain('корректен');
  });

  test('invalid card number gets .invalid class and error message', async () => {
    await page.type('.card-form-widget .input', '1234567890123456');
    await page.click('.card-form-widget .submit');

    await page.waitForSelector('.card-form-widget .input.invalid');
    expect(await page.$('.card-form-widget .input.invalid')).toBeTruthy();

    const resultText = await page.$eval('.result', (el) => el.textContent);
    expect(resultText).toContain('некорректен');
  });

  test('card logo changes with input', async () => {
    await page.type('.card-form-widget .input', '4111111111111111');

    await page.waitForFunction(
      () => document.querySelector('.card-logo').dataset.cardType === 'visa'
    );
    const type = await page.$eval('.card-logo', (el) => el.dataset.cardType);
    expect(type).toBe('visa');
  });
});