import { Given, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import logger from '../logger/logger';

const url = "https://www.webdriveruniversity.com/";

Given('I navigate to the webdriveruniversity homepage', async () => {
    // Use a try block to check for errors
    try { 
    //Access URL
    await pageFixture.page.goto(url);
        logger.info('Accessing URL: ' + url) // configured in the logger and .env files
        // throw new Error('Simulating an error during navigation');
    } catch (error: any) {
        logger.error('An error has occurred: ' + error.message); // prints the error message configed in the logger file
    }
});

When('I click on the contact us button', async () => {
    //await page.pause();
    const contactUsButton = pageFixture.page.getByRole('link', { name: 'CONTACT US Contact Us Form' });
    await contactUsButton.click();
});

// Added as part of Section 9 Challenge
When('I click on the login portal link', async () => {
    const loginPortalLink = pageFixture.page.getByRole('link', { name: 'LOGIN PORTAL Login Portal' });
    await loginPortalLink.click();
});

// await pageFixture.page.pause();

