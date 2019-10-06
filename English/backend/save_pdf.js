const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const file = path.resolve(__dirname, '../index.html');
  console.log(file);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`file://${file}`, {waitUntil: 'networkidle2'});
  await page.pdf({path: 'English/LukaZivanovic_CV.pdf', format: 'A4'});

  await browser.close();
})();