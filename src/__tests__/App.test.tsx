import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Header component', () => {
  render(<App />);
  const headerElement = screen.getByTestId('header');
  expect(headerElement).toBeInTheDocument();
});

test('renders ItemManager component', () => {
  render(<App />);
  const itemManagerElement = screen.getByTestId('item-manager');
  expect(itemManagerElement).toBeInTheDocument();
});

test('renders Footer component', () => {
  render(<App />);
  const footerElement = screen.getByRole('contentinfo');
  expect(footerElement).toBeInTheDocument();
});

test('renders ScrollTopButton component', () => {
  render(<App />);
  const scrollTopButtonElement = screen.getByRole('button', { name: /scroll to top/i });
  expect(scrollTopButtonElement).toBeInTheDocument();
});