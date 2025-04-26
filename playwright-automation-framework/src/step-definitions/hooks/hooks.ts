import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { Browser, chromium, firefox, webkit, BrowserType } from "@playwright/test";
import { pageFixture } from "./browserContextFixture";

// Load env variables from .env file:
import { config as loadEnv } from "dotenv"
const env = loadEnv({ path: './env/.env' })

// Create a configuration object for easy access to .env file variables
const config = {
    // If no value in UI_AUTOMATION_BROWSER, default to to 'true, or the || value
    headless: env.parsed?.HEADLESS === 'true',
    browser: env.parsed?.UI_AUTOMATION_BROWSER || 'chromium', 
    width: parseInt(env.parsed?.BROWSER_WIDTH || '1920'),
    height: parseInt(env.parsed?.BROWSER_HEIGHT || '1080')
}

// Create dictionary mapping the browser names to their launch functions
const browsers: { [key: string]: BrowserType } = {
    'chromium': chromium,
    'firefox': firefox,
    'webkit': webkit
};

let browserInstance: Browser | null = null;

async function initializeBrowserContext(selectedBrowser: string): Promise<Browser> {
    const launchBrowser = browsers[selectedBrowser]; // select browser from browsers dictionary
    if (!launchBrowser) { // if it's not in the dictionary throw an error, with message...
        throw new Error(`Invalid browser selected: ${selectedBrowser}`)
    }

    return await launchBrowser.launch({ headless: config.headless });
}

async function initializePage(): Promise<void> {
    if (!browserInstance) { // if null is true, throw an error...
        throw new Error('Browser instance is null')
    }
    pageFixture.context = await browserInstance.newContext({ // if null not triggered use the Browser instance being declared
        ignoreHTTPSErrors: true
    });
    pageFixture.page = await pageFixture.context.newPage(); // pageFixture is in the browserContextFixture file
    await pageFixture.page.setViewportSize({width: config.width, height: config.height})
}

//BeforeAll hook: Runs once before all scenarios
BeforeAll(async function () {
    console.log("\nExecuting test suite...");
})

//AfterAll hook: Runs once after all scenarios
AfterAll(async function () {
    console.log("\nFinished execution of test suite!");
})

// Before hook: Runs before each scenario - to check for any errors
Before(async function () {
    try {
        browserInstance = await initializeBrowserContext(config.browser)
        console.log(`Browser context initialized for: ${config.browser}`)
        await initializePage();
    } catch (error) {
        console.error('Browser context initialization failed:', error)
    }
})

// After hook: Runs after each scenario
After(async function ({ pickle, result }) {
    // creating a screenshot for failures
    if (result?.status === Status.FAILED) {
        if (pageFixture.page) {
            const screenshotPath = `./reports/screenshots/${pickle.name}-${Date.now()}.png`;
            const image = await pageFixture.page.screenshot({
                path: screenshotPath,
                type: 'png',
                // timeout: 6000
            });
            await this.attach(image, 'image/png');
        } else {
            console.error('pageFixture.page is undefined');
        }
    }
    if (browserInstance) { // logic to tear down page
        await pageFixture.page?.close();
        await browserInstance.close();
    }
})