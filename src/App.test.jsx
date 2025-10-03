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
    { src: "/images/galeria-1.webp", alt: "Tatuaje de rosario en hombro y brazo, estilo blackwork." },
    { src: "/images/galeria-2.webp", alt: "Tatuaje de dragón en la espalda, estilo japonés a color." },
    { src: "/images/galeria-3.webp", alt: "Tatuaje de diseño biomecánico en antebrazo, blackwork." },
    { src: "/images/galeria-4.webp", alt: "Tatuaje de rostro de mujer en antebrazo, blackwork." }
  ];

  galleryImages.forEach((img, i) => {
    expect(img).toHaveAttribute('src', expectedImages[i].src);
    expect(img).toHaveAttribute('alt', expectedImages[i].alt);
  });
});

test('should render the tattoo simulator section correctly', () => {
  render(<App />);

  // Check for the main heading of the simulator
  expect(screen.getByRole('heading', { name: /Simulador de Tatuajes/i })).toBeInTheDocument();

  // Check for the three steps
  expect(screen.getByRole('heading', { name: /1. Sube tu Foto/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /2. Elige un Diseño/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /3. Ajusta el Tamaño/i })).toBeInTheDocument();

  // Check for the upload button
  expect(screen.getByText(/Seleccionar una foto/i)).toBeInTheDocument();

  // Check for the size slider
  expect(screen.getByRole('slider')).toBeInTheDocument();
});