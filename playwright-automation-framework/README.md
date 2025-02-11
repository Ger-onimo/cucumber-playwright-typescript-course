UDEMY COURSE: Playwright withh Cucumber BDD and Typescript
This repo starts at section 4 (project setup for cod along learning)
https://www.udemy.com/course/playwright-with-cucumber-bdd-typescript-beginner-to-pro/learn/lecture/45251107#overview

------------------------------------------------------
To execute the feature file, the long way:
npx cucumber-js src/features/*.feature --require-module ts-node/register --require src/step-definitions/**/**/*.ts

Instead create a custom command in package.json scripts: {
    "cucumberWithTS":"cucumber-js src/features/*.feature --require-module ts-node/register --require src/step-definitions/**/**/*.ts "},

Run using:
npm run cucumberWithTS

Creating Scenarios for the following website:
https://www.webdriveruniversity.com/Contact-Us/contactus.html

------------------------------------------------------
Lesson 51 - CHALLENGE
https://webdriveruniversity.com/Login-Portal/index.html?
- Navigate to the Web Driver University.com home page.
- Click on the Login Portal.
- Create a positive and negative scenario.

DATA:
- Username: webdriver
- Password: webdriver 123
- Success msg: "validation succeeded"
- Fail msg: "validation failed"

MVP (validating the JS alert box not required):
- Create a new feature file which contains two scenarios, one being a valid login and the second being invalid login.
- Produce the steps required to enter a username.
- Enter a password and click on the login button.

ADDITIONAL CHALLENGE:
- Validating the alert window.
------------------------------------------------------
