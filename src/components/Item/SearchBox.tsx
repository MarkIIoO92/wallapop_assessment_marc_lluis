import { Input } from 'antd';
import { SearchBoxProps } from '../../types/SearchBoxProps'

const SearchBox: React.FC<SearchBoxProps> = ({ searchQuery, onSearchChange }) => {
  
  return (
    <Input
      placeholder="Search items..."
      value={searchQuery}
      onChange={onSearchChange}
    />
  );
};

export default SearchBox;