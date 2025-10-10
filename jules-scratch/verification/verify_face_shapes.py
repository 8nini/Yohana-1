from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Start the Application and navigate to the page
        page.goto("http://localhost:5174/")

        # 2. Scroll to the face shapes section
        face_shapes_section = page.locator("#tipos-rostro")
        face_shapes_section.scroll_into_view_if_needed()
        expect(face_shapes_section).to_be_visible()

        # 3. Take a screenshot for visual confirmation
        page.screenshot(path="jules-scratch/verification/face_shapes_section.png")
        print("Screenshot saved to jules-scratch/verification/face_shapes_section.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)