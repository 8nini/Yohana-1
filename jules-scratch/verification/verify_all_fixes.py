from playwright.sync_api import sync_playwright, Page, expect

def run_verification(page: Page):
    """
    Verifies the reordered sections and updated icons.
    """
    # 1. Navigate to the application.
    page.goto("http://localhost:5173")

    # --- Verify Section Reordering ---

    # 2. Scroll to the Simulator section to check the order of the following section.
    simulator_heading = page.get_by_role("heading", name="Simulador de Tatuajes")
    simulator_heading.scroll_into_view_if_needed()
    expect(simulator_heading).to_be_visible()

    # 3. Take a screenshot to show the "Inspiración con IA" section follows the simulator.
    page.screenshot(path="jules-scratch/verification/reordered_sections.png", full_page=True)

    # --- Verify Updated Icons ---

    # 4. Find and click the 'Cuidados' navigation button.
    cuidados_button = page.get_by_role("button", name="Cuidados")
    cuidados_button.click()

    # 5. Wait for the heading of the 'Warriors Cuidados' section to be visible.
    cuidados_heading = page.get_by_role("heading", name="Warriors Cuidados")
    cuidados_heading.scroll_into_view_if_needed()
    expect(cuidados_heading).to_be_visible()

    # 6. Take a screenshot to confirm the new icons are present.
    page.screenshot(path="jules-scratch/verification/updated_icons.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        run_verification(page)
        browser.close()

if __name__ == "__main__":
    main()