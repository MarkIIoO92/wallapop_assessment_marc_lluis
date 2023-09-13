import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoadMoreButton from '../../../components/Item/LoadMoreButton';

const mockProps = {
  displayedItemsLength: 5,
  itemsLength: 10,
  searchQuery: '',
  totalFilteredItems: 0,
  onLoadMore: jest.fn(),
};

describe('LoadMoreButton', () => {
  test('renders LoadMoreButton component', () => {
    render(<LoadMoreButton {...mockProps} />);
    const loadMoreButtonElement = screen.getByRole('button', { name: /load more items/i });
    expect(loadMoreButtonElement).toBeInTheDocument();
  });

  test('calls onLoadMore function when button is clicked', () => {
    render(<LoadMoreButton {...mockProps} />);
    const loadMoreButtonElement = screen.getByRole('button', { name: /load more items/i });
    fireEvent.click(loadMoreButtonElement);
    expect(mockProps.onLoadMore).toHaveBeenCalled();
  });

  test('does not render button when displayedItemsLength is greater than or equal to itemsLength', () => {
    const props = {
      ...mockProps,
      displayedItemsLength: 10,
    };
    render(<LoadMoreButton {...props} />);
    const loadMoreButtonElement = screen.queryByRole('button', { name: /load more items/i });
    expect(loadMoreButtonElement).not.toBeInTheDocument();
  });

  test('does not render button when searchQuery is not empty and displayedItemsLength is greater than or equal to totalFilteredItems', () => {
    const props = {
      ...mockProps,
      searchQuery: 'test',
      totalFilteredItems: 5,
      displayedItemsLength: 5,
    };
    render(<LoadMoreButton {...props} />);
    const loadMoreButtonElement = screen.queryByRole('button', { name: /load more items/i });
    expect(loadMoreButtonElement).not.toBeInTheDocument();
  });
});