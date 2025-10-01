from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Navigate to the local development server
        page.goto("http://localhost:5173/")

        # 2. Verify the "Estilos" section images
        estilos_section = page.locator("#estilos")
        estilos_section.scroll_into_view_if_needed()
        expect(estilos_section).to_be_visible()
        page.wait_for_load_state("networkidle")
        page.screenshot(path="jules-scratch/verification/estilos_section.png")

        # 3. Verify the "Cejas" section images
        cejas_section = page.locator("#cejas")
        cejas_section.scroll_into_view_if_needed()
        expect(cejas_section).to_be_visible()

        # Wait for the first cejas image to become visible
        first_cejas_image = page.get_by_alt_text("Hair Stroke – Hiperrealismo pelo a pelo")
        expect(first_cejas_image).to_be_visible(timeout=15000)

        page.wait_for_load_state("networkidle")
        page.screenshot(path="jules-scratch/verification/cejas_section.png")

        # 4. Verify the "Galería" section images
        galeria_section = page.locator("#galeria")
        galeria_section.scroll_into_view_if_needed()
        expect(galeria_section).to_be_visible()

        # Wait for the first gallery image to become visible
        first_gallery_image = page.get_by_alt_text("Trabajo 1")
        expect(first_gallery_image).to_be_visible(timeout=15000)

        page.wait_for_load_state("networkidle")
        page.screenshot(path="jules-scratch/verification/galeria_section.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)