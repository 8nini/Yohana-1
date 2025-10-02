import { render, screen } from '@testing-library/react';
import App from './App';
import { expect, test } from 'vitest';

test('should render the Cejas link in the navigation', () => {
  render(<App />);

  // This assertion will fail before the fix because the button is not in the document.
  // We use queryByRole which returns null if not found, leading to a clean assertion failure.
  expect(screen.queryByRole('button', { name: /cejas/i })).toBeInTheDocument();
});

test('should render gallery images with correct src attributes', () => {
  render(<App />);

  const galleryImages = screen.getAllByAltText(/Trabajo \d+/i);

  expect(galleryImages).toHaveLength(4);

  galleryImages.forEach((img, i) => {
    // The image alt text is "Trabajo i+1", so we expect the src to be "galeria-i+1.jpg"
    expect(img).toHaveAttribute('src', `/images/galeria-${i + 1}.jpg`);
  });
});