import { render, screen } from '@testing-library/react';
import FilterDropdown from '../../../components/Item/FilterDropdown';
import { FilterDropdownProps } from '../../../types/FilterDropdownProps';

const defaultProps: FilterDropdownProps = {
  selectedSort: '',
  onSortChange: jest.fn(),
};

const renderComponent = (props: Partial<FilterDropdownProps> = {}) => {
  const mergedProps = { ...defaultProps, ...props };
  return render(<FilterDropdown {...mergedProps} />);
};

test('renders the component with default props', () => {
  renderComponent();

  const selectElement = screen.getByRole('combobox');
  expect(selectElement).toBeInTheDocument();
});