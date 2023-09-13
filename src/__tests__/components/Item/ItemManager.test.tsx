import React from 'react';
import { render, screen } from '@testing-library/react';
import ItemManager from '../../../components/Item/ItemManager';

describe('ItemManager', () => {
  test('renders ItemManager component', () => {
    render(<ItemManager />);
    const itemManagerElement = screen.getByTestId('item-manager');
    expect(itemManagerElement).toBeInTheDocument();
  });

  test('renders header with "Item Manager" text', () => {
    render(<ItemManager />);
    const headerElement = screen.getByRole('heading', { name: /item manager/i });
    expect(headerElement).toBeInTheDocument();
  });

  test('renders ItemList component', () => {
    render(<ItemManager />);
    const itemListElement = screen.getByTestId('item-list');
    expect(itemListElement).toBeInTheDocument();
  });
});