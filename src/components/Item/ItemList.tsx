import React, { useEffect, useState, useCallback } from 'react';
import { ItemProps } from '../../types/ItemProps';
import { ItemService } from '../../services/ItemService';
import SearchBox from './SearchBox';
import FilterDropdown from './FilterDropdown';
import ItemCard from './ItemCard';
import LoadMoreButton from './LoadMoreButton';
import FavoriteItems from './FavoriteItems';
import { message } from 'antd';

function ItemList() {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [displayedItems, setDisplayedItems] = useState<ItemProps[]>([]);
  const [expandedItemIndex, setExpandedItemIndex] = useState<number | null>(null);
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showInitialItems, setShowInitialItems] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [totalFilteredItems, setTotalFilteredItems] = useState<number>(0);
  const [favoriteItems, setFavoriteItems] = useState<ItemProps[]>([]);

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
    let sortedItems: ItemProps[] = [...displayedItems];

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
  
  const handleToggleFavorite = (item: ItemProps) => {
    const itemIndex = favoriteItems.findIndex((i) => i.title === item.title);
  
    if (itemIndex >= 0) {
      // Remove the item from the favoriteItems list if it's already in the list
      setFavoriteItems((prevItems) =>
        prevItems.filter((_, index) => index !== itemIndex)
      );
      message.info(`${item.title} removed from favorites.`);
    } else {
      // Add the item to the favoriteItems list with isFavorite set to true
      setFavoriteItems((prevItems) =>
        prevItems.concat({ ...item, isFavorite: true })
      );
      message.success(`${item.title} added to favorites.`);
    }
  };

  useEffect(() => {
    // Update the isFavorite property of the item objects based on the favoriteItems state
    setItems((prevItems) =>
      prevItems.map((item) => {
        const isFavorite = favoriteItems.some((favItem) => favItem.title === item.title);
        return { ...item, isFavorite };
      })
    );
  }, [favoriteItems]);

  return (
    <div className="item-list-container" data-testid="item-list">
      <FavoriteItems
        favoriteItems={favoriteItems}
        setFavoriteItems={setFavoriteItems}
        onToggleFavorite={handleToggleFavorite}
      />
      <div className="item-list">
        <h2>Item List</h2>
        <div className={`search-and-sort ${searchPerformed ? 'search-performed' : ''}`}>
          <SearchBox
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
          {displayedItems.length > 0 && (
            <FilterDropdown
              selectedSort={selectedSort}
              onSortChange={handleSortChange}
            />
          )}
        </div>
        <div className={`item-grid ${!searchQuery && !showInitialItems ? 'hidden' : ''}`}>
          {displayedItems.map((item, index) => (
            <ItemCard
              key={`${item.title}-${index}`}
              item={{ ...item, isFavorite: item.isFavorite ?? false }}
              index={index}
              expandedItemIndex={expandedItemIndex}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onToggleFavorite={handleToggleFavorite}
              favoriteItems={favoriteItems}
              data-testid={`item-card-${index}`}
            />
          ))}
        </div>
        {searchQuery && displayedItems.length === 0 && (
          <div className="no-results">
            <img src={`${process.env.PUBLIC_URL}/no-results.png`} alt="No results" />            
            <p>No results found.</p>
          </div>
        )}
        <LoadMoreButton
          displayedItemsLength={displayedItems.length}
          itemsLength={items.length}
          searchQuery={searchQuery}
          totalFilteredItems={totalFilteredItems}
          onLoadMore={loadMoreItems}
        />
      </div>
    </div>
  );
}

export default ItemList;
