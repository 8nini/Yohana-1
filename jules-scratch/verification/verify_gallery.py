from playwright.sync_api import sync_playwright, Page, expect

def verify_gallery_images(page: Page):
    """
    This script verifies that the gallery images are rendered correctly
    after the image path and file renaming fix.
    """
    # 1. Navigate to the running application.
    page.goto("http://localhost:5173")

    # 2. Scroll to the gallery section.
    gallery_section = page.locator("#galeria")
    gallery_section.scroll_into_view_if_needed()

    # Wait for images to be loaded
    page.wait_for_load_state("networkidle")

    # 3. Assert that the gallery section is visible.
    expect(gallery_section).to_be_visible()

    # 4. Take a screenshot of the gallery.
    page.screenshot(path="jules-scratch/verification/gallery_final_verification.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_gallery_images(page)
        browser.close()

if __name__ == "__main__":
    main()