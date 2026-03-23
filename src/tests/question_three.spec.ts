 import {test, expect} from '@playwright/test'

 const FIRST_NAME = "Alexander Giovanni"
 const LAST_NAME = "Gamarra Tafur"
 const EMAIL = "agamarrat@outlook.com"
 const EMAIL_EDITED = "agamarrat_edited@outlook.com"
 const AGE = "27"
 const SALARY = "1000"
 const DEPARTMENT = "Lima"

 test("Verify Web Tables", async({page}) => {
    await page.goto("https://demoqa.com/webtables")
    await expect(page.getByRole('heading', { name: 'Web Tables' })).toBeVisible()
 
    //Add row
    await page.locator('#addNewRecordButton').click()
    await expect(page.locator('#registration-form-modal')).toBeVisible()
    await page.locator("#firstName").fill(FIRST_NAME)
    await page.getByPlaceholder("Last Name").fill(LAST_NAME)
    await page.locator("#userEmail").fill(EMAIL)
    await page.locator("#age").fill(AGE)
    await page.locator("#salary").fill(SALARY)
    await page.locator("#department").fill(DEPARTMENT)
    await page.locator('#submit').click()

    //Verify Row Added
    let row = page.locator('tr').filter({ hasText: FIRST_NAME })
    await expect(row.locator('td').nth(1)).toHaveText(LAST_NAME);
    await expect(row.locator('td').nth(2)).toHaveText(AGE);
    await expect(row.locator('td').nth(3)).toHaveText(EMAIL);
    await expect(row.locator('td').nth(4)).toHaveText(SALARY);
    await expect(row.locator('td').nth(5)).toHaveText(DEPARTMENT);

    //Edite row
    await page.locator('tr').filter({ hasText: FIRST_NAME }).locator('xpath=//span[@title="Edit"]').click()
    await expect(page.locator('#registration-form-modal')).toBeVisible()
    await page.locator("#userEmail").fill(EMAIL_EDITED)
    await page.locator('#submit').click()

    //Verify Row Edited
    await expect(row.locator('td').nth(3)).toHaveText(EMAIL_EDITED);

    //Delete row
    await page.locator('tr').filter({ hasText: FIRST_NAME }).locator('xpath=//span[@title="Delete"]').click()
    await expect(row).not.toBeAttached()
 })