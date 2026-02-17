import { test, expect, type Page } from '@playwright/test'

const adminUsername =
  process.env.E2E_ADMIN_USERNAME ?? process.env.E2E_ADMIN_EMAIL
const adminPassword = process.env.E2E_ADMIN_PASSWORD

async function loginAsAdmin(page: Page) {
  await page.goto('/admin/login')
  await page.fill('#username', adminUsername!)
  await page.fill('#password', adminPassword!)
  await page.getByRole('button', { name: '관리자 로그인' }).click()
  await expect(page).toHaveURL(/\/admin(?:\/)?$/)
}

test.describe('Notice Sync: Admin <-> Customer', () => {
  test.skip(
    !adminUsername || !adminPassword,
    'Set E2E_ADMIN_USERNAME(or E2E_ADMIN_EMAIL) and E2E_ADMIN_PASSWORD to run.'
  )

  test('create, update, delete notice should sync to /announcements', async ({
    page,
  }) => {
    const nonce = Date.now()
    const createdTitle = `[E2E] Notice Sync Created ${nonce}`
    const updatedTitle = `[E2E] Notice Sync Updated ${nonce}`
    const createdContent = `Created at ${nonce}`
    const updatedContent = `Updated at ${nonce}`

    await loginAsAdmin(page)
    await page.goto('/admin/notices')

    await page.fill('#title', createdTitle)
    await page.fill('#content', createdContent)
    await page.getByRole('button', { name: '추가', exact: true }).click()

    // Re-open to avoid relying on optimistic UI behavior.
    await page.goto('/admin/notices')
    const createdRow = page.locator('tr', { hasText: createdTitle })
    await expect(createdRow).toBeVisible()

    await page.goto('/announcements')
    await expect(page.getByText(createdTitle, { exact: true })).toBeVisible()

    await page.goto('/admin/notices')
    const rowForUpdate = page.locator('tr', { hasText: createdTitle })
    await expect(rowForUpdate).toBeVisible()
    await rowForUpdate.getByRole('button', { name: '수정', exact: true }).click()
    await rowForUpdate.locator('input#title').fill(updatedTitle)
    await rowForUpdate.locator('textarea#content').fill(updatedContent)
    await rowForUpdate
      .locator('form')
      .getByRole('button', { name: '수정', exact: true })
      .click()

    await page.goto('/admin/notices')
    const updatedRow = page.locator('tr', { hasText: updatedTitle })
    await expect(updatedRow).toBeVisible()
    await expect(page.locator('tr', { hasText: createdTitle })).toHaveCount(0)

    await page.goto('/announcements')
    await expect(page.getByText(updatedTitle, { exact: true })).toBeVisible()
    await expect(page.getByText(createdTitle, { exact: true })).toHaveCount(0)

    await page.goto('/admin/notices')
    const rowForDelete = page.locator('tr', { hasText: updatedTitle })
    await expect(rowForDelete).toBeVisible()
    await rowForDelete.getByRole('button', { name: '삭제', exact: true }).click()
    await rowForDelete.getByRole('button', { name: '확인', exact: true }).click()

    await page.goto('/admin/notices')
    await expect(page.locator('tr', { hasText: updatedTitle })).toHaveCount(0)

    await page.goto('/announcements')
    await expect(page.getByText(updatedTitle, { exact: true })).toHaveCount(0)
  })
})
