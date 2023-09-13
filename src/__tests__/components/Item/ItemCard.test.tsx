import React from 'react';
import ItemCard from '../../../components/Item/ItemCard';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

describe('ItemCard', () => {
  const item = {
    title: 'Test Item',
    image: 'https://example.com/image.jpg',
    description: 'This is a test item',
    price: 10,
    email: 'test@example.com',
  };
  const props = {
    item,
    index: 0,
    expandedItemIndex: 0,
    onMouseEnter: jest.fn(),
    onMouseLeave: jest.fn(),
    onToggleFavorite: jest.fn(),
    favoriteItems: [],
  };

  it('renders without crashing', () => {
    render(<ItemCard {...props} />);
  });

  it('displays the item title', () => {
    render(<ItemCard {...props} />);
    expect(screen.getByText(item.title)).toBeInTheDocument();
  });

  it('displays the item image', () => {
    render(<ItemCard {...props} />);
    const imageElement = screen.getByTestId('item-image');
    const backgroundImage = getComputedStyle(imageElement).getPropertyValue('background-image');
    expect(backgroundImage).toContain(item.image);
  });

  it('calls onMouseEnter when mouse enters the card', async () => {
    render(<ItemCard {...props} />);
    fireEvent.mouseEnter(screen.getByRole('img'));
    await waitFor(() => expect(props.onMouseEnter).toHaveBeenCalled());
  });

  it('calls onMouseLeave when mouse leaves the card', async () => {
    render(<ItemCard {...props} />);
    fireEvent.mouseLeave(screen.getByRole('img'));
    await waitFor(() => expect(props.onMouseLeave).toHaveBeenCalled());
  });

  it('calls onToggleFavorite when favorite button is clicked', async () => {
    render(<ItemCard {...props} />);
    fireEvent.click(screen.getByRole('img', { name: 'heart' }));
    await waitFor(() => expect(props.onToggleFavorite).toHaveBeenCalledWith(item));
  });

  it('displays the item description, price, and email when expanded', () => {
    render(<ItemCard {...props} expandedItemIndex={0} />);
    expect(screen.getByText(item.description)).toBeInTheDocument();
    expect(screen.getByText(`${item.price}€`)).toBeInTheDocument();
    expect(screen.getByText(item.email)).toBeInTheDocument();
  });

  it('does not display the item description, price, and email when not expanded', () => {
    render(<ItemCard {...props} expandedItemIndex={1} />);
    expect(screen.queryByText(item.description)).not.toBeInTheDocument();
    expect(screen.queryByText(`${item.price}€`)).not.toBeInTheDocument();
    expect(screen.queryByText(item.email)).not.toBeInTheDocument();
  });
});