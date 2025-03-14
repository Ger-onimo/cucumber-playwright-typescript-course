import { When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

When('I type a first name', async () => {
    await pageFixture.page.getByPlaceholder('First Name').fill("Jo");
});

When('I type a last name', async () => {
    await pageFixture.page.getByPlaceholder('Last Name').fill("Banana");
});

When('I enter an email address', async () => {
    await pageFixture.page.getByPlaceholder('Email Address').fill("JoBananas@this.com");
});

When('I type a comment', async () => {
    await pageFixture.page.getByPlaceholder('Comments').fill("This is a comment.");
});

When('I click on the submit button', async () => {
    // const submitButton = pageFixture.page.getByRole('button', { name: 'SUBMIT' });
    // Alternative to the above which is the method used in the Homepage_Steps file
    await pageFixture.page.waitForSelector('input[value="SUBMIT"]');
    await pageFixture.page.click('input[value="SUBMIT"]');
});

Then('I should be presented with a successful contact us submission message', async () => {
    // Waiting for the header text element
    await pageFixture.page.waitForSelector('#contact_reply h1', { timeout: 600000 });
    // Getting the text from the h1 element
    const text = await pageFixture.page.innerText('#contact_reply h1');
    // Assert using 'expect' the h1 element text is as it should be
    expect(text).toBe("Thank You for your Message!");
    // await pageFixture.page.pause()
});

Then('I should be presented with an unsuccessful contact us message', async () => {
    // Waiting for the <body> tag element
    await pageFixture.page.waitForSelector('body', { timeout: 600000 });
    // Locate the <body> element
    const bodyElement = pageFixture.page.locator('body');
    // Extract text from the element
    const bodyText = await bodyElement.textContent()

    expect(bodyText).toMatch(/Error: (all fields are required|Invalid email address)/);
});

// Cucumber expressions - Lesson 41

When('I type a specific first name {string}', async (firstName: string) => {
    await pageFixture.page.getByPlaceholder('First Name').fill(firstName);
});

When('I type a specific last name {string}', async (lastName: string) => {
    await pageFixture.page.getByPlaceholder('Last Name').fill(lastName);
});

When('I enter a specific email address {string}', async (emailAddress: string) => {
    await pageFixture.page.getByPlaceholder('Email Address').fill(emailAddress);
});

When('I type specific text {string} and a number {int} within the comment input field', async (word: string, number: number) => {
    await pageFixture.page.getByPlaceholder('Comments').fill(`${word} ${number}`); // or (word + " " + number)
});

// Random Data - lesson 43

When('I type a random first name', async () => {
    const randomFirstName = faker.person.firstName();
    await pageFixture.page.getByPlaceholder('First Name').fill(randomFirstName);
});

When('I type a random last name', async () => {
    const randomLastName = faker.person.lastName();
    await pageFixture.page.getByPlaceholder('Last Name').fill(randomLastName);
});

When('I enter a random email address', async () => {
    const randomEmail = faker.internet.email();
    await pageFixture.page.getByPlaceholder('Email Address').fill(randomEmail);
});

//  Scenarios Outlines - lesson 47 - inputs
When('I type a first name {word} and a last name {word}', async (firstName: string, lastName: string) => {
    await pageFixture.page.getByPlaceholder('First Name').fill(firstName);
    await pageFixture.page.getByPlaceholder('Last Name').fill(lastName);
});

When('I type an email address {string} and a comment {string}', async (email: string, comment: string)=> {
    await pageFixture.page.getByPlaceholder('Email Address').fill(email);
    await pageFixture.page.getByPlaceholder('Comments').fill(comment); 
});

//  Scenarios Outlines - lesson 48 - message response validation
Then('I should be presented with header text {string}', async (message: string) => {
    // Using the element selector for both the successful and unsuccessful messages
    //h1 | //body - this finds h1 or body
    await pageFixture.page.waitForSelector("//h1 | //body", { state: 'visible' });
    // Get all the elements we need
    const elements = await pageFixture.page.locator("//h1 | //body").elementHandles();
    let foundElementText = '';
    // Loop through each of the elements
    for (let element of elements) {
        // Get the inner text for each element
        let text = await element.innerText();
        // if statement to check for the expected text for each iteration
        if (text.includes(message)) {
            foundElementText = text;
            break;
        }
    }
    expect(foundElementText).toContain(message);
});

// await pageFixture.page.pause()


