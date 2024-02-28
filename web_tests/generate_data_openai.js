/* eslint-disable no-console */
/* eslint-disable prefer-arrow-callback */
// eslint-disable-next-line one-var
const webdriver = require('selenium-webdriver');
const { Chatbot, ChatGPTInput } = require('intellinode');

// set the api key for OpenAI
const chatbot = new Chatbot("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");

const input = new ChatGPTInput('You are helping with creating valid looking data');
input.addUserMessage('Generate a realistic looking name and home address for a person living in the US');

// eslint-disable-next-line no-unused-vars
const testdata = chatbot.chat(input);
// eslint-disable-next-line prefer-template
console.log('Test Data to be used: ' + testdata);

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
// eslint-disable-next-line no-undef
driver.get('http://localhost:9000').then(function(){
// eslint-disable-next-line no-invalid-this, no-unused-vars
// eslint-disable-next-line no-console, prefer-template
driver.findElement(webdriver.By.css('a[href*="receipt-scanning-app"')).click().then(function(){
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