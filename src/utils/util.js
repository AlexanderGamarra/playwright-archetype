export async function writeAndselectValue(page, locator, value) {
    await page.locator(locator).pressSequentially(value);
    await page.getByRole('option', { name: value }).last().click();
}

export async function verifyAlert(page, description){
    page.on('dialog', async dialog => {
        expect(dialog.message()).toBe(description)
        await dialog.accept();
    });
}