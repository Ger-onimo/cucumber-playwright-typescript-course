import { Given, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";

const url = "https://www.webdriveruniversity.com/";

Given('I navigate to the webdriveruniversity homepage', async () => {
    //Access URL
    await pageFixture.page.goto(url);
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

