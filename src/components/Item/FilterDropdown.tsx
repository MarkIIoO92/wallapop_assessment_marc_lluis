import React from 'react';
import { Select } from 'antd';
import { FilterDropdownProps } from '../../types/FilterDropdownProps'

const { Option } = Select;

const FilterDropdown: React.FC<FilterDropdownProps> = ({ selectedSort, onSortChange }) => {
  return (
    <Select value={selectedSort} onChange={onSortChange}>
      <Option value="">Sort by...</Option>
      <Option value="title">Title</Option>
      <Option value="description">Description</Option>
      <Option value="price">Price</Option>
      <Option value="email">Email</Option>
    </Select>
  );
};

export default FilterDropdown;