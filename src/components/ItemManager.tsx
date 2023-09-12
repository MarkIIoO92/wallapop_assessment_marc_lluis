import React from 'react';
import ItemList from './ItemList';
import '../styles/components/_item-manager.scss';

function ItemManager() {
  return (
    <div className="item-manager">
      <header>
        <h1>Item Manager</h1>
      </header>
      <main>
        <ItemList />
      </main>
    </div>
  );
}

export default ItemManager;