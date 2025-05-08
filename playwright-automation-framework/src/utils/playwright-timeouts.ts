import { Page } from '@playwright/test';

export function setGlobalSettings(page: Page) {
    // Set Global navigation timeout - for methods like '.goto'
    page.setDefaultNavigationTimeout(50000); // wait up to 50 seconds

    // Set Global command timeout - for methods such as '.click()', '.type()', '.waitFor()'
    page.setDefaultTimeout(5000); // 30 seconds
}

// Override global 'navigation' timeout - Command Example:
// await page.goto('https://example.com', { timeout: 60000 });

// Override global 'command timeout' - Command Example:
// await page.waitForSelector('#my-element', { timeout: 60000 });
// await page.type('#my-input', 'Hello', { timeout: 60000 });
// await page.click('#my-button', { timeout: 60000 });

//MAKE SURE!!!!!!! - Cucumber timeouts value is always HIGHER!!!!!