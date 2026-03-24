 import {test, expect} from '@playwright/test'
 
const MODAl_1 = { title: 'Small Modal', description: 'This is a small modal. It has very less content'}
const MODAl_2 = { title: 'Large Modal', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'}

test("Verify Modal Dialogs", async({page}) => {
    await page.goto("/modal-dialogs")
    await expect(page.getByRole('heading', { name: 'Modal Dialogs' })).toBeVisible()
    await expect(page.getByText('Click on button to see modal')).toBeVisible()
    await expect(page.locator('.modal-dialog')).not.toBeVisible();

    //Verify first modal
    await page.locator('#showSmallModal').click()
    const first_modal = page.locator('.modal-dialog');
    await expect(first_modal).toBeVisible();
    await expect(first_modal.locator('.modal-title')).toHaveText(MODAl_1.title);
    await expect(first_modal.locator('.modal-body')).toContainText(MODAl_1.description);
    await first_modal.locator('#closeSmallModal').click();
    await expect(first_modal).toBeHidden();

    //Verify second modal
    await page.locator('#showLargeModal').click()
    const second_modal = page.locator('.modal-dialog');
    await expect(second_modal).toBeVisible();
    await expect(second_modal.locator('.modal-title')).toHaveText(MODAl_2.title);
    await expect(second_modal.locator('.modal-body')).toContainText(MODAl_2.description);
    await second_modal.locator('#closeLargeModal').click();
    await expect(second_modal).toBeHidden();
})
