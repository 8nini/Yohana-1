import { render, screen, within } from '@testing-library/react';
import App from './App';
import { expect, test } from 'vitest';

test('should render the Cejas link in the navigation', () => {
  render(<App />);

  // This assertion will fail before the fix because the button is not in the document.
  // We use queryByRole which returns null if not found, leading to a clean assertion failure.
  expect(screen.queryByRole('button', { name: /cejas/i })).toBeInTheDocument();
});

test('should render gallery images with correct src and alt attributes', () => {
  render(<App />);

  const galleryRegion = screen.getByRole('region', { name: /Galería de Trabajos/i });
  const galleryImages = within(galleryRegion).getAllByRole('img');

  expect(galleryImages).toHaveLength(4);

  const expectedImages = [
    { src: "/images/galeria-1.jpg", alt: "Tatuaje de rosario en hombro y brazo, estilo blackwork." },
    { src: "/images/galeria-2.jpg", alt: "Tatuaje de dragón en la espalda, estilo japonés a color." },
    { src: "/images/galeria-3.jpg", alt: "Tatuaje de diseño biomecánico en antebrazo, blackwork." },
    { src: "/images/galeria-4.jpg", alt: "Tatuaje de rostro de mujer en antebrazo, blackwork." }
  ];

  galleryImages.forEach((img, i) => {
    expect(img).toHaveAttribute('src', expectedImages[i].src);
    expect(img).toHaveAttribute('alt', expectedImages[i].alt);
  });
});