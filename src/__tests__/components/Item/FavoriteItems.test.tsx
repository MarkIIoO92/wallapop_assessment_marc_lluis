import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import FavoriteItems from '../../../components/Item/FavoriteItems';
import { FavoriteItemsProps } from '../../../types/FavoriteItemsProps';

test('menu is initially closed', () => {
  const props: FavoriteItemsProps = {
    favoriteItems: [],
    setFavoriteItems: jest.fn(),
    onToggleFavorite: jest.fn(),
  };

  render(<FavoriteItems {...props} />);
  expect(screen.queryByRole('textbox', { name: /search by title/i })).not.toBeInTheDocument();
});

test('menu opens when the toggle button is clicked', () => {
  const props: FavoriteItemsProps = {
    favoriteItems: [],
    setFavoriteItems: jest.fn(),
    onToggleFavorite: jest.fn(),
  };

  render(<FavoriteItems {...props} />);
  fireEvent.click(screen.getByRole('button', { name: /menu/i }));

  expect(screen.getByPlaceholderText(/search by title/i)).toBeInTheDocument();
});

test('menu closes when the toggle button is clicked again', async () => {
  const props: FavoriteItemsProps = {
    favoriteItems: [],
    setFavoriteItems: jest.fn(),
    onToggleFavorite: jest.fn(),
  };

  render(<FavoriteItems {...props} />);
  const toggleButton = screen.getByRole('button', { name: /menu/i });

  fireEvent.click(toggleButton);
  fireEvent.click(toggleButton);

  // Wait for the menu to close
  await waitFor(() => {
    expect(screen.queryByRole('textbox', { name: /search by title/i })).not.toBeInTheDocument();
  });

});

test('search functionality filters the favorite items correctly', () => {
  const props: FavoriteItemsProps = {
    favoriteItems: [
      {
        title: 'Item 1',
        description: 'Item 1 description',
        price: 100,
        email: 'item1@example.com',
        image: 'https://example.com/item1.jpg',
      },
      {
        title: 'Item 2',
        description: 'Item 2 description',
        price: 200,
        email: 'item2@example.com',
        image: 'https://example.com/item2.jpg',
      },
    ],
    setFavoriteItems: jest.fn(),
    onToggleFavorite: jest.fn(),
  };

  render(<FavoriteItems {...props} />);
  fireEvent.click(screen.getByRole('button', { name: /menu/i }));

  fireEvent.change(screen.getByPlaceholderText(/search by title/i), {
    target: { value: 'Item 1' },
  });

  expect(screen.getByText(/Item 1/i)).toBeInTheDocument();
  expect(screen.queryByText(/Item 2/i)).not.toBeInTheDocument();
});

test('clicking the delete button removes an item from the favorites', () => {
  const onToggleFavoriteMock = jest.fn();

  const props: FavoriteItemsProps = {
    favoriteItems: [
      {
        title: 'Item 1',
        description: 'Item 1 description',
        price: 100,
        email: 'item1@example.com',
        image: 'https://example.com/item1.jpg',
      },
    ],
    setFavoriteItems: jest.fn(),
    onToggleFavorite: onToggleFavoriteMock,
  };

  render(<FavoriteItems {...props} />);
  fireEvent.click(screen.getByRole('button', { name: /menu/i }));

  fireEvent.click(screen.getByRole('button', { name: /delete/i }));

  expect(onToggleFavoriteMock).toHaveBeenCalledWith(props.favoriteItems[0]);
});