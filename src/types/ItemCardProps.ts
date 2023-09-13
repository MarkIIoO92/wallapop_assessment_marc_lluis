import { ItemProps } from './ItemProps';

export interface ItemCardProps {
  item: ItemProps;
  index: number;
  expandedItemIndex: number | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onToggleFavorite: (item: ItemProps) => void;
  favoriteItems: ItemProps[];
}