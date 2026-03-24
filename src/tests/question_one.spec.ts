 import {test, expect} from '@playwright/test'

 const FIRST_NAME = "Alexander Giovanni"
 const LAST_NAME = "Gamarra Tafur"
 const EMAIL = "agamarrat@outlook.com"
 const GENDER = "Male"
 const PHONE_NUMBER = "9999999999"
 const BIRTH_DAY = "20 May 1998"
 const SUBJECT = "Arts"
 const HOBBIE_SPORT = [
    'Sports',
    'hobbies-checkbox-1'
 ]
 const HOBBIE_MUSIC = [
    'Music',
    'hobbies-checkbox-3'
 ]
 const ADDRESS = "Vargas Prada 999"
 const FILE_NAME = "Test Automation.pdf"
 const STATE = "NCR"
 const CITY = "Delhi"

 test("Fill Form", async({page}) => {
    await page.goto("/automation-practice-form")
    await expect(page.getByRole('heading', { name: 'Practice Form' })).toBeVisible()

    await page.locator("xpath=//*[@id=\"firstName\"]").fill(FIRST_NAME)
    await page.getByPlaceholder("Last Name").fill(LAST_NAME)
    await page.getByPlaceholder("name@example.com").fill(EMAIL)
    await page.locator('input[value='+ GENDER +']').check()
    await page.getByPlaceholder("Mobile Number").fill(PHONE_NUMBER)
    await page.locator('input[id=\"dateOfBirthInput\"]').fill(BIRTH_DAY);
    await page.getByRole('heading', { name: 'Practice Form' }).click()
    await page.locator('input[value='+ GENDER +']').check()
    await page.locator('#subjectsInput').pressSequentially(SUBJECT);
    await page.getByRole('option', { name: SUBJECT }).click()
    await page.locator("xpath=//*[@id=\""+ HOBBIE_SPORT[1] +"\"]").check()
    await page.locator("xpath=//*[@id=\""+ HOBBIE_MUSIC[1] +"\"]").check()
    await page.setInputFiles('#uploadPicture', FILE_NAME);
    await page.getByPlaceholder("Current Address").fill(ADDRESS)
    await page.locator('#react-select-3-input').pressSequentially(STATE)
    await page.getByRole('option', { name: STATE }).click()
    await page.locator('#react-select-4-input').pressSequentially(CITY)
    await page.getByRole('option', { name: CITY }).click()


    // 2. Send Form
    await page.locator('#submit').click()

    // 3. Succesfull pop-up verification
    let date_part = BIRTH_DAY.split(" ") 
    await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');
    await expect(page.locator('tr').filter({ hasText: 'Student Name' }).locator('td').nth(1)).toHaveText(FIRST_NAME + ' ' + LAST_NAME);
    await expect(page.locator('tr').filter({ hasText: 'Student Email' }).locator('td').nth(1)).toHaveText(EMAIL);
    await expect(page.locator('tr').filter({ hasText: 'Gender' }).locator('td').nth(1)).toHaveText(GENDER);
    await expect(page.locator('tr').filter({ hasText: 'Mobile' }).locator('td').nth(1)).toHaveText(PHONE_NUMBER);
    await expect(page.locator('tr').filter({ hasText: 'Date of Birth' }).locator('td').nth(1)).toContainText(date_part[0] + ' ' + date_part[1] + ',' + date_part[2]);
    await expect(page.locator('tr').filter({ hasText: 'Subjects' }).locator('td').nth(1)).toHaveText(SUBJECT);
    await expect(page.locator('tr').filter({ hasText: 'Hobbies' }).locator('td').nth(1)).toHaveText(HOBBIE_SPORT[0] + ', ' + HOBBIE_MUSIC[0]);
    await expect(page.locator('tr').filter({ hasText: 'Picture' }).locator('td').nth(1)).toHaveText(FILE_NAME);
    await expect(page.locator('tr').filter({ hasText: 'Address' }).locator('td').nth(1)).toHaveText(ADDRESS);
    await expect(page.locator('tr').filter({ hasText: 'State and City' }).locator('td').nth(1)).toHaveText(STATE + ' ' + CITY);    

 })