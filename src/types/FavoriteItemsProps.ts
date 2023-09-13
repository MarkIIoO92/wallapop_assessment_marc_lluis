import React from 'react';
import { ItemProps } from './ItemProps';

export interface FavoriteItemsProps {
  favoriteItems: ItemProps[];
  setFavoriteItems: React.Dispatch<React.SetStateAction<ItemProps[]>>;
  onToggleFavorite: (item: ItemProps) => void;
}