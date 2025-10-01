from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Navigate to the local development server
        page.goto("http://localhost:5173/")
        page.wait_for_load_state("networkidle")

        # 2. Verify Redesign (Fonts and Colors)
        main_container = page.locator('.min-h-screen.bg-background')
        expect(main_container).to_have_css('background-color', 'rgb(26, 26, 26)') # #1A1A1A

        heading = page.locator('h1').first
        expect(heading).to_have_css('font-family', 'Poppins, sans-serif')

        # 3. Verify Image Updates & Centering
        # Cejas Section
        cejas_section = page.locator("#cejas")
        cejas_section.scroll_into_view_if_needed()
        first_cejas_image = page.get_by_alt_text("Hair Stroke – Hiperrealismo pelo a pelo")
        expect(first_cejas_image).to_be_visible(timeout=15000)

        # Galería Section
        galeria_section = page.locator("#galeria")
        galeria_section.scroll_into_view_if_needed()
        first_gallery_image = page.get_by_alt_text("Trabajo 1")
        expect(first_gallery_image).to_be_visible(timeout=15000)

        # 4. Verify Contact Form
        contact_section = page.locator("#contacto")
        contact_section.scroll_into_view_if_needed()
        name_input = page.get_by_placeholder("Tu nombre")
        email_input = page.get_by_placeholder("tu@email.com")
        message_input = page.get_by_placeholder("Cuéntame sobre tu idea de tatuaje...")
        submit_button = page.get_by_role("button", name="Enviar Mensaje")

        name_input.fill("Test User")
        email_input.fill("test@example.com")
        message_input.fill("This is a test message.")
        submit_button.click()

        expect(name_input).to_have_value("", timeout=5000)
        expect(email_input).to_have_value("")
        expect(message_input).to_have_value("")

        # 5. Verify SEO Tags
        canonical_link = page.locator('link[rel="canonical"]')
        expect(canonical_link).to_have_attribute('href', 'https://yohana-1.vercel.app')
        og_image = page.locator('meta[property="og:image"]')
        expect(og_image).to_have_attribute('content', 'https://yohana-1.vercel.app/images/hero.jpg')

        # 6. Verify Floating WhatsApp Button
        whatsapp_button = page.locator('.fixed.bottom-6.right-6')
        expect(whatsapp_button).to_be_visible()

        # 7. Take a final screenshot
        page.screenshot(path="jules-scratch/verification/final_verification.png", full_page=True)

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)