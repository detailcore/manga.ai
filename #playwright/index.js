const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 1024 },
  });
  const page = await context.newPage();  
  await page.goto('https://youbeable.net/');
  // await page.screenshot({ path: 'screenshot.png' });

  let selectorQwe = `//*[@id="app"]/main/article/div/div[2]/div[2]`;
  await page.waitForSelector(selectorQwe) //Ожидает селектор
  
  const response = await page.waitForResponse(response => {
    return response.url().includes(`/api/questions`)
  });
  console.log(
    'RESPONSE ',
    (await response.text())
  );

  // const title_rus = await page.$(selectorQwe)

  // const status = await page.evaluate(async (title_rus) => {
  //   return title_rus.innerText
  // }, title_rus);

  // console.log(status);

  await browser.close();
})();
