import { test, expect } from '@playwright/test'

test.describe('Authentication System', () => {
  test.describe('Signup Flow', () => {
    test('should navigate through signup steps', async ({ page }) => {
      // Step 1: Account Info
      await page.goto('/signup')
      await expect(page.getByRole('heading', { name: /계정 생성|Account/i })).toBeVisible()

      // Fill step 1 form
      await page.fill('#userid', 'testuser123')
      await page.fill('#realname', '테스트 사용자')
      await page.fill('#phone', '010-1234-5678')
      await page.fill('#email', `test${Date.now()}@example.com`)
      await page.fill('#password', 'TestPassword123!')
      await page.fill('#password-confirm', 'TestPassword123!')

      // Go to step 2
      await page.click('button[type="submit"]')
      await expect(page).toHaveURL(/\/signup\/business/)

      // Step 2: Business Info
      await expect(page.getByRole('heading', { name: /Business Information/i })).toBeVisible()

      await page.fill('input[id="company-name"]', '테스트 주얼리')
      await page.fill('input[id="ceo-name"]', '홍길동')
      await page.fill('input[id="biz-num"]', '123-45-67890')

      // Select business type (WHOLESALE)
      await page.click('input[value="WHOLESALE"]')

      await page.fill('#address-main', '서울시 강남구 테헤란로 123')
      await page.fill('#zipcode', '06234')
      await page.fill('#address-detail', '4층 401호')

      // Upload file (create a test file)
      const fileInput = page.locator('input[type="file"]')
      if (await fileInput.count() > 0) {
        // Create a small test image
        await fileInput.setInputFiles({
          name: 'test-license.jpg',
          mimeType: 'image/jpeg',
          buffer: Buffer.from('fake-image-data'),
        })
      }
    })

    test('should show validation errors on empty form', async ({ page }) => {
      await page.goto('/signup')
      await page.click('button[type="submit"]')

      // Check validation errors appear
      await expect(page.getByText(/아이디를 입력하세요|사용자명을 입력하세요/i)).toBeVisible()
    })
  })

  test.describe('Login Flow', () => {
    test('should display login page', async ({ page }) => {
      await page.goto('/login')
      await expect(page.getByRole('heading', { name: /Login|로그인/i })).toBeVisible()
      await expect(page.locator('input[type="email"]')).toBeVisible()
      await expect(page.locator('input[type="password"]')).toBeVisible()
    })

    test('should show error on invalid credentials', async ({ page }) => {
      await page.goto('/login')

      await page.fill('input[type="email"]', 'invalid@example.com')
      await page.fill('input[type="password"]', 'wrongpassword')
      await page.click('button[type="submit"]')

      // Should show error message
      await expect(page.getByText(/invalid|잘못된|실패/i)).toBeVisible({ timeout: 5000 })
    })

    test('should redirect to signup page', async ({ page }) => {
      await page.goto('/login')

      // Find and click signup link
      const signupLink = page.getByRole('link', { name: /회원가입|Sign up|Register/i })
      await signupLink.click()

      await expect(page).toHaveURL(/\/signup/)
    })
  })

  test.describe('Protected Routes', () => {
    test('should redirect unauthenticated user from protected routes', async ({ page }) => {
      await page.goto('/admin/users')

      // Should redirect to login or show unauthorized
      const url = page.url()
      const hasRedirected = url.includes('/admin/login') || url.includes('/login') || url.includes('/unauthorized')
      const hasError = await page.getByText(/unauthorized|로그인|권한/i).isVisible().catch(() => false)

      expect(hasRedirected || hasError).toBeTruthy()
    })
  })

  test.describe('Admin Pages', () => {
    test('admin login page should be accessible without auth', async ({ page }) => {
      await page.goto('/admin/login')
      await expect(page.getByRole('heading', { name: /관리자/i })).toBeVisible()
      await expect(page.locator('input[type="email"]')).toBeVisible()
      await expect(page.locator('input[type="password"]')).toBeVisible()
    })

    test('admin dashboard should redirect unauthenticated users to login', async ({ page }) => {
      await page.goto('/admin')
      await expect(page).toHaveURL(/\/admin\/login/)
    })

    test('admin products page should redirect unauthenticated users', async ({ page }) => {
      await page.goto('/admin/products')
      await expect(page).toHaveURL(/\/admin\/login/)
    })

    test('admin categories page should redirect unauthenticated users', async ({ page }) => {
      await page.goto('/admin/categories')
      await expect(page).toHaveURL(/\/admin\/login/)
    })

    test('admin collections page should redirect unauthenticated users', async ({ page }) => {
      await page.goto('/admin/collections')
      await expect(page).toHaveURL(/\/admin\/login/)
    })

    test('admin logout endpoint should redirect to admin login', async ({ page }) => {
      // The /auth/signout route redirects to /admin/login after logout
      // Playwright's request API follows redirects, so we verify the final response
      const response = await page.request.post('http://localhost:3000/auth/signout')

      // After following redirects, should be at admin login (200 OK)
      // or get a redirect status (303, 307) if redirects aren't followed
      const status = response.status()
      expect([200, 303, 307]).toContain(status)

      // If we got 200, verify we ended up at admin login page
      if (status === 200) {
        // The final URL should be the admin login page
        const url = response.url()
        expect(url).toContain('/admin/login')
      } else {
        // If we got a redirect, check the location header
        const location = response.headers()['location']
        expect(location).toContain('/admin/login')
      }
    })
  })
})
