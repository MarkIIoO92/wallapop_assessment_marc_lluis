import { Item } from '../types/Item';

async function fetchItems(): Promise<Item[]> {
  const response = await fetch('https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json');
  const data = await response.json();
  return data.items;
}

export const ItemService = {
  fetchItems,
};