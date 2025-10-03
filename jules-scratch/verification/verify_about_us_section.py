from playwright.sync_api import sync_playwright, Page, expect

def run_verification(page: Page):
    """
    Navigates to the app, clicks the 'Sobre Nosotros' link, scrolls the section
    into view, and takes a screenshot.
    """
    # 1. Navigate to the application.
    page.goto("http://localhost:5173")

    # 2. Find and click the 'Sobre Nosotros' navigation button.
    about_us_button = page.get_by_role("button", name="Sobre Nosotros")
    about_us_button.click()

    # 3. Find the 'Sobre Nosotros' section heading.
    about_us_heading = page.get_by_role("heading", name="Sobre Nosotros")

    # 4. Explicitly scroll the heading into view.
    about_us_heading.scroll_into_view_if_needed()

    # 5. Wait for the heading to be fully visible after scrolling.
    expect(about_us_heading).to_be_visible()

    # 6. Take a screenshot for visual confirmation.
    page.screenshot(path="jules-scratch/verification/about_us_section.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        run_verification(page)
        browser.close()

if __name__ == "__main__":
    main()