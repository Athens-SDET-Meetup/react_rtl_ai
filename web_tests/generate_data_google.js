/* eslint-disable prefer-arrow-callback */
// eslint-disable-next-line one-var
const webdriver = require('selenium-webdriver');
const { TextServiceClient } =
  require("@google-ai/generativelanguage").v1beta2;

const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/text-bison-001";
const API_KEY = process.env.API_KEY;

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
// eslint-disable-next-line no-undef
driver.get('http://localhost:9000').then(function(){
// eslint-disable-next-line no-invalid-this, no-unused-vars
const { firstName, lastName } = this.getUserDetails() // fetch new fake generative AI test data
// eslint-disable-next-line no-console, prefer-template
console.log("First name: " + firstName  + " Last Name: " + lastName)
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

// eslint-disable-next-line no-unused-vars
function getUserDetails() {
    return new Promise((resolve) => {
        const prompt = "Generate a first name and a last name for a person living in Canada";

        client
          .generateText({
            model: MODEL_NAME,
            prompt: {
              text: prompt,
            },
          })
          .then((result) => {
            const { firstName, lastName } = result.split(' ')
            resolve({
            	firstName,
            	lastName
            })
          });
    })
}