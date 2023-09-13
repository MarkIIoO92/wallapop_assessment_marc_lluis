import React from 'react';
import { LoadMoreButtonProps } from '../../types/LoadMoreButtonProps'

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  displayedItemsLength,
  itemsLength,
  searchQuery,
  totalFilteredItems,
  onLoadMore,
}) => {
  return (
    <>
      {displayedItemsLength > 0 &&
      displayedItemsLength < itemsLength &&
      (searchQuery ? displayedItemsLength < totalFilteredItems : true) ? (
        <button className="load-more-btn" onClick={onLoadMore}>
          Load More Items ...
        </button>
      ) : null}
    </>
  );
};

export default LoadMoreButton;