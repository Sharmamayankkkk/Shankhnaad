import { render, screen } from '@testing-library/react';
import App from './App';

test('renders maintenance page', () => {
  render(<App />);
  const maintenanceText = screen.getByText(/We are undergoing technical maintenance/i);
  expect(maintenanceText).toBeInTheDocument();
});

test('renders Hare Krishna Mahamantra', () => {
  render(<App />);
  const mahamantraText = screen.getByText(/Till then, chant the Hare Krishna Mahamantra/i);
  expect(mahamantraText).toBeInTheDocument();
});

test('renders Lost in Maya title', () => {
  render(<App />);
  const titleText = screen.getByText(/Lost in Maya/i);
  expect(titleText).toBeInTheDocument();
});
