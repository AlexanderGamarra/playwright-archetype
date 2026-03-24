import {test, expect} from '@playwright/test'

test("Verify Drag and Drop action", async({page}) => {
    await page.goto("/droppable")
    await expect(page.getByRole('heading', { name: 'Droppable' })).toBeVisible()
       
    const drag = page.locator('[id="draggable"]');
    const drop = page.locator('[id="droppable"]').first();

    await expect(drop).toHaveText('Drop Here')
    await expect(drop).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await page.waitForTimeout(5000)
    await drag.dragTo(drop)    
    await expect(drop).toHaveText('Dropped!')
    await expect(drop).toHaveCSS('background-color', 'rgb(70, 130, 180)');
})

