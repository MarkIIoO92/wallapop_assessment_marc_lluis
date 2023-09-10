import React, { useEffect, useState } from 'react';
import { Item } from '../types/Item';
import { ItemService } from '../services/ItemService';

function ItemList() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchItems() {
      const items = await ItemService.fetchItems();
      console.log("items: ", items);
      setItems(items);
    }

    fetchItems();
  }, []);

  return (
    <div>
      <h2>Item List</h2>
      {items.map((item) => (
        <div key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>{item.price}</p>
          <p>{item.email}</p>
          <img src={item.image} alt={item.title} />
        </div>
      ))}
    </div>
  );
}

export default ItemList;