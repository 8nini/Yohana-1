from playwright.sync_api import sync_playwright, Page, expect
import os

def run_verification(page: Page):
    """
    Verifies all the fixes: tattoo simulator, section reordering, and updated icons.
    """
    # 1. Navigate to the application.
    page.goto("http://localhost:5173")

    # --- Verify Tattoo Simulator Fix ---

    # 2. Scroll to the simulator section.
    simulator_section = page.locator('#simulador')
    simulator_heading = simulator_section.get_by_role("heading", name="Simulador de Tatuajes")
    simulator_heading.scroll_into_view_if_needed()
    expect(simulator_heading).to_be_visible()

    # 3. Upload a real image file for the body part.
    image_path = "public/images/galeria-2.jpg"
    page.locator('input[id="simulator-upload"]').set_input_files(image_path)

    # 4. Wait for the uploaded body part image to be visible.
    body_image = simulator_section.get_by_alt_text("Parte del cuerpo para simular tatuaje")
    expect(body_image).to_be_visible()

    # 5. Select a tattoo design within the simulator section.
    design_image_to_select = simulator_section.get_by_alt_text("Tatuaje de rosario en hombro y brazo, estilo blackwork.")
    design_image_to_select.click()

    # 6. Wait for the test overlay to be visible.
    test_overlay = simulator_section.get_by_text("TEST OVERLAY")
    expect(test_overlay).to_be_visible()

    # 7. Take a screenshot of the simulator with the test overlay.
    simulator_section.screenshot(path="jules-scratch/verification/simulator_fix.png")

    # --- Verify Section Reordering and Icons ---

    # 8. Scroll to the "Inspiración con IA" section.
    ia_heading = page.get_by_role("heading", name="Inspiración con IA")
    ia_heading.scroll_into_view_if_needed()
    expect(ia_heading).to_be_visible()

    # 9. Take a screenshot of the reordered sections and updated icons.
    page.screenshot(path="jules-scratch/verification/reorder_and_icons.png", full_page=True)


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        run_verification(page)
        browser.close()

if __name__ == "__main__":
    main()