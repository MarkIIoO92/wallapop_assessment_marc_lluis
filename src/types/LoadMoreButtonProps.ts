export interface LoadMoreButtonProps {
  displayedItemsLength: number;
  itemsLength: number;
  searchQuery: string;
  totalFilteredItems: number;
  onLoadMore: () => void;
}