from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    page.on("dialog", lambda dialog: dialog.dismiss())

    try:
        # 1. Navigate and set up the simulator
        page.goto("http://localhost:5173/")
        simulator_section = page.locator("#simulador")
        simulator_section.scroll_into_view_if_needed()

        file_input_label = page.locator('label[for="simulator-upload"]')
        with page.expect_file_chooser() as fc_info:
            file_input_label.click()
        file_chooser = fc_info.value
        file_chooser.set_files("public/images/galeria-3.webp")
        expect(page.get_by_alt_text("Parte del cuerpo para simular tatuaje")).to_be_visible()

        # 2. Enter URL
        url_input = page.get_by_placeholder("O pega una URL")
        load_button = page.get_by_role('button', name="Cargar diseño desde URL")
        test_url = "https://via.placeholder.com/150.png?text=Test+Image"
        url_input.fill(test_url)

        # 3. Screenshot before the click to verify the input is filled
        page.screenshot(path="jules-scratch/verification/before_click.png")
        print("Saved before_click.png")

        # 4. Click the load button
        load_button.click()

        # 5. Wait for potential re-render and screenshot after the click
        page.wait_for_timeout(2000)
        page.screenshot(path="jules-scratch/verification/after_click.png")
        print("Saved after_click.png")

        # 6. Verify the design image is now visible
        design_image = page.get_by_alt_text("Diseño de tatuaje para simular")
        expect(design_image).to_be_visible()
        print("Verification successful!")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)