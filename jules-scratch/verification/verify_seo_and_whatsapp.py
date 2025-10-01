from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Navigate to the local development server
        page.goto("http://localhost:5173/")

        # 2. Verify the new SEO meta tags
        # Check for the canonical link
        canonical_link = page.locator('link[rel="canonical"]')
        expect(canonical_link).to_have_attribute('href', 'https://yohana-1.vercel.app')

        # Check for the Open Graph image tag
        og_image = page.locator('meta[property="og:image"]')
        expect(og_image).to_have_attribute('content', 'https://yohana-1.vercel.app/images/hero.jpg')

        # 3. Verify the floating WhatsApp button
        # The button should not be visible initially
        whatsapp_button = page.locator('.fixed.bottom-6.right-6')
        expect(whatsapp_button).not_to_be_visible()

        # Scroll down to make the button appear
        page.evaluate("window.scrollTo(0, 500)")

        # The button should now be visible
        expect(whatsapp_button).to_be_visible(timeout=5000)

        # Take a screenshot for visual confirmation
        page.screenshot(path="jules-scratch/verification/seo_and_whatsapp.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)