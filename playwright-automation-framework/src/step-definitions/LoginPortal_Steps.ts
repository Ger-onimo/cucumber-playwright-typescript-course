import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";

let alertText: string;

// Got directly to the login page rather than bouncing to the Homepage steps
Given('I navigate to the webdriveruniversity login portal', async () => {
    await pageFixture.page.goto('https://webdriveruniversity.com/Login-Portal/index.html?');
});

When('I type a username {word}', async (username: string) => {
    await pageFixture.page.getByPlaceholder("Username").fill(username);
});

When('I type a password {word}', async (password: string) => {
    await pageFixture.page.getByPlaceholder("Password").fill(password);
});

When('I click on the login button', async () => {
    pageFixture.page.on("dialog", async (alert) => {
        alertText = alert.message();
        await alert.accept(); // Accept acts as the OK button
    })
    const loginButton = pageFixture.page.locator("#login-button");
    await loginButton.hover();
    // Ensure click is performed regardless of the element's visibility
    await loginButton.click({ force: true });
    // await pageFixture.page.waitForTimeout(2000);

});

Then('I should be presented with an alert box with validation text {string}', async (expectedAlertText: string) => {
    expect(alertText).toBe(expectedAlertText);
});

// await pageFixture.page.pause();
