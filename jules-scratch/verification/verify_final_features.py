from playwright.sync_api import sync_playwright, Page, expect

def verify_final_features(page: Page):
    """
    This script verifies the final UI for the advanced simulator and the AI inspiration section.
    """
    # 1. Navigate to the running application.
    page.goto("http://localhost:5173")

    # 2. Verify the Simulator section
    simulator_section = page.locator("#simulador")
    simulator_section.scroll_into_view_if_needed()
    expect(simulator_section.get_by_role("heading", name="Simulador de Tatuajes")).to_be_visible()
    simulator_section.screenshot(path="jules-scratch/verification/final_simulator_verification.png")

    # 3. Verify the AI Inspiration section
    ai_section = page.locator("#inspiracion-ia")
    ai_section.scroll_into_view_if_needed()
    expect(ai_section.get_by_role("heading", name="Inspiración con IA")).to_be_visible()
    ai_section.screenshot(path="jules-scratch/verification/final_ai_verification.png")


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_final_features(page)
        browser.close()

if __name__ == "__main__":
    main()