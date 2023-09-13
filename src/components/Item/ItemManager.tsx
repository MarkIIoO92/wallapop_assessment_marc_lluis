import ItemList from './ItemList';

function ItemManager() {
  return (
    <div className="item-manager" data-testid="item-manager">
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