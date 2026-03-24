 import {test, expect} from '@playwright/test'
 import {verifyAlert} from '../utils/util.js'
 
test.beforeEach(async ({ page }) => {
    await page.goto("/alerts")
    await expect(page.getByRole('heading', { name: 'Alerts' })).toBeVisible()
});

test("Very Alert Button", async({page}) => {
    await expect(page.getByText('Click Button to see alert')).toBeVisible()
    await page.locator('#alertButton').click()
    await verifyAlert(page, 'You clicked a button')
})

test("Very Timer Alert ", async({page}) => {
    await expect(page.getByText('On button click, alert will appear after 5 seconds')).toBeVisible()
    await page.locator('#timerAlertButton').click()
    await verifyAlert(page, 'This alert appeared after 5 seconds')
})

test("Verify Confirm Alert", async({page}) => {
    await expect(page.getByText('On button click, confirm box will appear')).toBeVisible()
    await page.locator('#confirmButton').click()
    await verifyAlert(page, 'Do you confirm action?')
    await expect(page.getByText('On button click, confirm box will appearYou selected Ok')).toBeVisible()
})

test("Verify Promt Alert", async({page}) => {
    await expect(page.getByText('On button click, confirm box will appear')).toBeVisible()
    await page.locator('#promtButton').click()
    page.on('dialog', async dialog => {
        expect(dialog.message()).toBe('Please enter your name')
        await dialog.accept('Alex');
    });

    await expect(page.getByText('On button click, prompt box will appearYou entered Alex')).toBeVisible()
})

