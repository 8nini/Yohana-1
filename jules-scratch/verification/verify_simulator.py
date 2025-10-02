from playwright.sync_api import sync_playwright, Page, expect

def verify_simulator_ui(page: Page):
    """
    This script verifies that the new tattoo simulator UI is rendered correctly.
    """
    # 1. Navigate to the running application.
    page.goto("http://localhost:5173")

    # 2. Scroll to the simulator section.
    simulator_section = page.locator("#simulador")
    simulator_section.scroll_into_view_if_needed()

    # 3. Wait for the section to be stable and visible.
    expect(simulator_section.get_by_role("heading", name="Simulador de Tatuajes")).to_be_visible()

    # 4. Take a screenshot of the entire simulator section.
    simulator_section.screenshot(path="jules-scratch/verification/simulator_verification.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_simulator_ui(page)
        browser.close()

if __name__ == "__main__":
    main()