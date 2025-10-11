import { render, screen, within, fireEvent } from '@testing-library/react';
import App from './App';
import { expect, test } from 'vitest';

test('should format hyphenated nav links correctly', () => {
  render(<App />);
  // This test will fail because "inspiracion-ia" is rendered as "Inspiracion-ia"
  expect(screen.getByRole('button', { name: /Inspiracion IA/i })).toBeInTheDocument();
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

test('should render the tattoo simulator section with all controls', () => {
  render(<App />);

  // Check for the main heading of the simulator
  expect(screen.getByRole('heading', { name: /Simulador de Tatuajes/i })).toBeInTheDocument();

  // Check for the three steps
  expect(screen.getByRole('heading', { name: /1. Sube tu Foto/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /2. Elige un Diseño/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /3. Ajusta el Tamaño/i })).toBeInTheDocument();

  // Check for the skin picture upload button
  expect(screen.getByText(/Seleccionar una foto/i)).toBeInTheDocument();

  // Check for the design upload options
  expect(screen.getByText(/Subir desde archivo/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/O pega una URL/i)).toBeInTheDocument();

  // Check for the size slider
  expect(screen.getByRole('slider')).toBeInTheDocument();
});

test('should render the AI Inspiration section correctly', () => {
  render(<App />);

  // Check for the main heading of the AI section
  expect(screen.getByRole('heading', { name: /Inspiración con IA/i })).toBeInTheDocument();

  // Check for the input field and button
  expect(screen.getByLabelText(/Describe tu idea de tatuaje/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Obtener Idea/i })).toBeInTheDocument();
});

test('should not update the design image with an invalid URL', async () => {
  render(<App />);

  // 1. Simulate uploading the simulator image
  const simulatorUploadInput = screen.getByLabelText(/Seleccionar una foto/i);
  const fakeFile = new File(['dummy'], 'test.png', { type: 'image/png' });
  fireEvent.change(simulatorUploadInput, { target: { files: [fakeFile] } });

  // Wait for the image to be processed and rendered
  const simulatorImage = await screen.findByAltText(/Parte del cuerpo para simular tatuaje/i);
  expect(simulatorImage).toBeInTheDocument();

  // 2. Get the URL input and the load button for the design
  const urlInput = screen.getByPlaceholderText(/O pega una URL/i);
  const loadButton = screen.getByRole('button', { name: /Cargar diseño desde URL/i });

  // 3. Simulate user input with an invalid URL
  fireEvent.change(urlInput, { target: { value: 'https://not-a-valid-image-url.com' } });

  // 4. Click the load button
  fireEvent.click(loadButton);

  // 5. Check that the design image is not rendered
  // With the bug, the component will try to render an <img /> with the invalid src,
  // so `queryByAltText` will find it, and the test will fail.
  const designImage = screen.queryByAltText(/Diseño de tatuaje para simular/i);
  expect(designImage).not.toBeInTheDocument();
});

test('should remove the design image if the URL is broken', async () => {
  render(<App />);

  // 1. Simulate uploading the simulator image to show the design area
  const simulatorUploadInput = screen.getByLabelText(/Seleccionar una foto/i);
  const fakeFile = new File(['dummy'], 'test.png', { type: 'image/png' });
  fireEvent.change(simulatorUploadInput, { target: { files: [fakeFile] } });
  await screen.findByAltText(/Parte del cuerpo para simular tatuaje/i);

  // 2. Get the URL input and load button
  const urlInput = screen.getByPlaceholderText(/O pega una URL/i);
  const loadButton = screen.getByRole('button', { name: /Cargar diseño desde URL/i });

  // 3. Input a valid-looking but broken image URL
  fireEvent.change(urlInput, { target: { value: 'http://localhost/broken.jpg' } });
  fireEvent.click(loadButton);

  // 4. The broken image will be in the DOM initially
  const designImage = screen.getByAltText(/Diseño de tatuaje para simular/i);
  expect(designImage).toBeInTheDocument();

  // 5. Simulate the image failing to load by firing the onError event
  fireEvent.error(designImage);

  // 6. Assert that the broken image is removed from the DOM.
  // This assertion will fail before the fix.
  expect(screen.queryByAltText(/Diseño de tatuaje para simular/i)).not.toBeInTheDocument();
});

test('should update the design image with a valid URL that has query parameters', async () => {
  render(<App />);

  // 1. Simulate uploading the simulator image
  const simulatorUploadInput = screen.getByLabelText(/Seleccionar una foto/i);
  const fakeFile = new File(['dummy'], 'test.png', { type: 'image/png' });
  fireEvent.change(simulatorUploadInput, { target: { files: [fakeFile] } });
  await screen.findByAltText(/Parte del cuerpo para simular tatuaje/i);

  // 2. Get the URL input and load button
  const urlInput = screen.getByPlaceholderText(/O pega una URL/i);
  const loadButton = screen.getByRole('button', { name: /Cargar diseño desde URL/i });

  // 3. Input a valid image URL with query parameters
  const validUrlWithQuery = 'https://via.placeholder.com/150.png?text=Test+Image';
  fireEvent.change(urlInput, { target: { value: validUrlWithQuery } });
  fireEvent.click(loadButton);

  // 4. Assert that the design image is rendered with the correct src.
  // This will fail before the regex is fixed.
  const designImage = await screen.findByAltText(/Diseño de tatuaje para simular/i);
  expect(designImage).toBeInTheDocument();
  expect(designImage).toHaveAttribute('src', validUrlWithQuery);
});
