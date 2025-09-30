import { render, screen } from '@testing-library/react';
import App from './App';
import { expect, test } from 'vitest';

test('should render the Cejas link in the navigation', () => {
  render(<App />);

  // This assertion will fail before the fix because the button is not in the document.
  // We use queryByRole which returns null if not found, leading to a clean assertion failure.
  expect(screen.queryByRole('button', { name: /cejas/i })).toBeInTheDocument();
});