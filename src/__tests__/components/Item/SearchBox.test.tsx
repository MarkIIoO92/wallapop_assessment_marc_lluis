import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from '../../../components/Item/SearchBox';

const mockProps = {
  searchQuery: '',
  onSearchChange: jest.fn(),
};

describe('SearchBox', () => {
  test('renders SearchBox component', () => {
    render(<SearchBox {...mockProps} />);
    const searchBoxElement = screen.getByPlaceholderText('Search items...');
    expect(searchBoxElement).toBeInTheDocument();
  });

  test('displays searchQuery prop value in input', () => {
    const props = {
      ...mockProps,
      searchQuery: 'test',
    };
    render(<SearchBox {...props} />);
    const searchBoxElement = screen.getByPlaceholderText('Search items...');
    expect(searchBoxElement).toHaveValue('test');
  });
});