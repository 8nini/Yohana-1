from playwright.sync_api import sync_playwright, expect
import time

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # 1. Go to the page
            page.goto("http://localhost:5173", wait_until="networkidle")

            # 2. Scroll down the page to trigger all lazy-loading and animations
            scroll_height = page.evaluate("document.body.scrollHeight")

            scroll_position = 0
            while scroll_position < scroll_height:
                page.mouse.wheel(0, 500) # Scroll down by 500 pixels
                time.sleep(0.5) # Wait for animations
                new_scroll_position = page.evaluate("window.pageYOffset + window.innerHeight")
                if new_scroll_position == scroll_position: # Break if we're stuck
                    break
                scroll_position = new_scroll_position
                if page.evaluate("window.pageYOffset + window.innerHeight >= document.body.scrollHeight"):
                    break

            # 3. Take a full-page screenshot
            page.screenshot(path="jules-scratch/verification/webp_verification.png", full_page=True)

            print("WebP verification script ran successfully.")

        except Exception as e:
            print(f"An error occurred: {e}")
            page.screenshot(path="jules-scratch/verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run_verification()