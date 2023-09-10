import React from 'react';
import ItemList from './ItemList';
import './ItemManager.scss';

function ItemManager() {
  return (
    <div className="item-manager">
      <header>
        <h1>Item Manager</h1>
      </header>
      <main>
        <ItemList />
      </main>
      <footer>
        <p>&copy; 2021 Item Manager</p>
      </footer>
    </div>
  );
}

export default ItemManager;