import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const announcementsPagePath = path.join(
  process.cwd(),
  'src/app/(main)/announcements/page.tsx'
)
const noticesActionPath = path.join(process.cwd(), 'src/app/actions/notices.ts')

test('announcements page should not use hardcoded notice arrays', () => {
  const source = fs.readFileSync(announcementsPagePath, 'utf8')

  assert.equal(source.includes('const pinnedNotices = ['), false)
  assert.equal(source.includes('const generalNotices = ['), false)
  assert.equal(source.includes('await fetchNoticesAction()'), true)
})

test('notice mutations should revalidate customer announcements path', () => {
  const source = fs.readFileSync(noticesActionPath, 'utf8')
  const matches = source.match(/revalidatePath\('\/announcements'\)/g) ?? []

  assert.equal(matches.length >= 3, true)
})
