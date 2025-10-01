from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Navigate to the local development server
        page.goto("http://localhost:5173/")

        # 2. Wait for the page to be fully loaded
        page.wait_for_load_state("networkidle")

        # 3. Take a full-page screenshot
        page.screenshot(path="jules-scratch/verification/redesign_screenshot.png", full_page=True)

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)