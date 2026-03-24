import {test, expect} from '@playwright/test'
import {writeAndselectValue} from '../utils/util.js'

const SELECT_VALUE = 'Group 1, option 1'
const SELECT_ONE_VALUE = 'Mr.'

test("Menu Validations", async({page}) => {
    await page.goto("/select-menu")
    await expect(page.getByRole('heading', { name: 'Select Menu' })).toBeVisible()

    await writeAndselectValue(page, '#react-select-2-input', SELECT_VALUE) 
    await writeAndselectValue(page, '#react-select-3-input', SELECT_ONE_VALUE)
    await page.locator('#oldSelectMenu').selectOption({ label: 'Purple' });
    await writeAndselectValue(page, '#react-select-4-input', "Green")
    await writeAndselectValue(page, '#react-select-4-input', "Blue")
    await page.locator('#cars').selectOption({ label: 'Audi' });
})