export async function writeAndselectValue(page, locator, value) {
    await page.locator(locator).pressSequentially(value);
    await page.getByRole('option', { name: value }).last().click();
}