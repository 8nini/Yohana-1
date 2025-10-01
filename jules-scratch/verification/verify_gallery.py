from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Navigate to the local development server
        page.goto("http://localhost:5173/")

        # 2. Verify the "Galería" section images
        galeria_section = page.locator("#galeria")
        galeria_section.scroll_into_view_if_needed()
        expect(galeria_section).to_be_visible()

        # Wait for the first gallery image to become visible
        first_gallery_image = page.get_by_alt_text("Trabajo 1")
        expect(first_gallery_image).to_be_visible(timeout=15000)

        # Add a timeout to allow for animations to complete
        page.wait_for_timeout(2000)

        page.screenshot(path="jules-scratch/verification/galeria_section_focused.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)