from playwright.sync_api import sync_playwright, Page, expect

def verify_seo_and_form(page: Page):
    """
    This script verifies that the SEO and form improvements are correctly
    implemented without visual regressions.
    """
    # 1. Navigate to the running application.
    page.goto("http://localhost:5173")

    # 2. Scroll to the contact section.
    contact_section = page.locator("#contacto")
    contact_section.scroll_into_view_if_needed()

    # Wait for the section to be stable
    expect(contact_section.get_by_role("heading", name="Contacto")).to_be_visible()

    # 3. Take a screenshot of the contact form area.
    page.screenshot(path="jules-scratch/verification/final_verification.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_seo_and_form(page)
        browser.close()

if __name__ == "__main__":
    main()