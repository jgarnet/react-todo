import { render, screen } from '@testing-library/react';
import App from './App';
import mockFetch from "../config/mockFetch";

test('renders learn react link', () => {
  window.fetch = mockFetch([]);
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
