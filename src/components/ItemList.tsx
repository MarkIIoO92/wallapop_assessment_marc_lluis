import React, { useEffect, useState, useCallback } from 'react';
import { Item } from '../types/Item';
import { ItemService } from '../services/ItemService';
import '../styles/components/_item-list.scss';
import { Card, Select, Input } from 'antd';
const { Option } = Select;

function ItemList() {
  const [items, setItems] = useState<Item[]>([]);
  const [displayedItems, setDisplayedItems] = useState<Item[]>([]);
  const [expandedItemIndex, setExpandedItemIndex] = useState<number | null>(null);
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showInitialItems, setShowInitialItems] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [totalFilteredItems, setTotalFilteredItems] = useState<number>(0);

  const ITEMS_PER_PAGE = 5;

  const loadAndDisplayItems = useCallback(() => {
    const startIndex = displayedItems.length;
    const endIndex = startIndex + ITEMS_PER_PAGE;
  
    // Filter items based on the search query
    const filteredItems = searchQuery
      ? items.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : items;
  
    const newItems = filteredItems.slice(startIndex, endIndex);
    let sortedItems = [...displayedItems, ...newItems]; // Append the new items
  
    // Sort the items based on the current sortBy value
    if (selectedSort === 'title') {
      sortedItems.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedSort === 'description') {
      sortedItems.sort((a, b) => a.description.localeCompare(b.description));
    } else if (selectedSort === 'price') {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'email') {
      sortedItems.sort((a, b) => a.email.localeCompare(b.email));
    }
  
    setDisplayedItems(sortedItems);
  }, [displayedItems, items, searchQuery, selectedSort]);

  useEffect(() => {
    async function fetchItems() {
      const allItems = await ItemService.fetchItems();
      setItems(allItems);
      setShowInitialItems(true); // Allow initial items to be displayed when data is loaded
    }

    fetchItems();
  }, []);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      if (!scrolledToBottom && displayedItems.length < items.length) {
        return;
      }

    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, displayedItems, selectedSort, loadAndDisplayItems]);

  const loadMoreItems = () => {
    loadAndDisplayItems();
  };

  const handleMouseEnter = (index: number) => {
    setExpandedItemIndex(index);
  };

  const handleMouseLeave = () => {
    setExpandedItemIndex(null);
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    let sortedItems: Item[] = [...displayedItems];

    switch (value) {
      case 'title':
        sortedItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'description':
        sortedItems.sort((a, b) => a.description.localeCompare(b.description));
        break;
      case 'price':
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case 'email':
        sortedItems.sort((a, b) => a.email.localeCompare(b.email));
        break;
      default:
        break;
    }

    setDisplayedItems(sortedItems);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim(); // Trim whitespace
    setSearchQuery(query);
    setSearchPerformed(true);
  
    if (query) {
      const filteredItems = items.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setTotalFilteredItems(filteredItems.length);
      setDisplayedItems(filteredItems.slice(0, 5));
    } else {
      // Reset displayed items when the search query is empty
      setDisplayedItems([]);
      setSearchPerformed(false);
    }
  };  

  return (
    <div className="item-list-container">
      <div className="item-list">
        <h2>Item List</h2>
        <div className={`search-and-sort ${searchPerformed ? 'search-performed' : ''}`}>
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {displayedItems.length > 0 && (
            <Select value={selectedSort} onChange={handleSortChange}>
              <Option value="">Sort by...</Option>
              <Option value="title">Title</Option>
              <Option value="description">Description</Option>
              <Option value="price">Price</Option>
              <Option value="email">Email</Option>
            </Select>
          )}
        </div>
        <div className={`item-grid ${!searchQuery && !showInitialItems ? 'hidden' : ''}`}>
          {displayedItems.map((item, index) => (
            <Card
              key={`${item.title}-${index}`}
              className="item"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              style={{
                height: index === expandedItemIndex ? 'auto' : '370px',
                overflow: 'hidden',
              }}
              cover={<img src={item.image} alt={item.title} />}
            >
              <h3>{item.title}</h3>
              {index === expandedItemIndex && (
                <>
                  <div>{item.description}</div>
                  <div>
                    <strong>Price:</strong> {item.price}€
                  </div>
                  <div>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${item.email}`}>{item.email}</a>
                  </div>
                </>
              )}
            </Card>
          ))}
        </div>
        {searchQuery && displayedItems.length === 0 && (
          <div className="no-results">
            <img src={`${process.env.PUBLIC_URL}/no-results.png`} alt="No results" />            
            <p>No results found.</p>
          </div>
        )}
        { displayedItems.length > 0 &&
          displayedItems.length < items.length &&
          (searchQuery ? displayedItems.length < totalFilteredItems : true) && (
            <button className="load-more-btn" onClick={loadMoreItems}>
              Load More Items ...
            </button>
        )}
      </div>
    </div>
  );
}

export default ItemList;
