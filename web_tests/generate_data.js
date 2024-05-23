const webdriver = require('selenium-webdriver');

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
// eslint-disable-next-line no-undef
driver.get('http://localhost:9000').then(()=> {
driver.findElement(webdriver.By.css('a[href*="receipt-scanning-app"')).click().then(()=> {
    driver.getTitle().then((title) => {
      // eslint-disable-next-line no-console
      console.log(title)
      if(title === 'Track expenses in a snap with Expensify\'s receipt scanning app') {
         // eslint-disable-next-line no-console
         console.log('Test passed');
      } else {
         // eslint-disable-next-line no-console
         console.log('Test failed');
      }
     driver.quit();
    });
  });
});