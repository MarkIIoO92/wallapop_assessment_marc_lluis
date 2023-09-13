import React, { useState } from 'react';
import { FavoriteItemsProps } from '../../types/FavoriteItemsProps';
import { MenuOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, List, Button } from 'antd';

const FavoriteItems: React.FC<FavoriteItemsProps> = ({
  favoriteItems,
  setFavoriteItems,
  onToggleFavorite,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnimationClass, setMenuAnimationClass] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const toggleMenu = () => {
    if (isMenuOpen) {
      setMenuAnimationClass('favorite-items-menu-closing');
      setTimeout(() => {
        setIsMenuOpen(false);
        setMenuAnimationClass('');
      }, 500);
    } else {
      setIsMenuOpen(true);
      setMenuAnimationClass('favorite-items-menu-animate');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filteredFavorites = favoriteItems.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <button className="favorite-menu-toggle" onClick={toggleMenu}>
        <MenuOutlined />
      </button>
      {isMenuOpen && (
        <div className={`favorite-items-menu ${menuAnimationClass}`}>
          <h2 className='favorite-modal-title'>Favorite Items</h2>
          <Input
            placeholder="Search by title"
            value={searchValue}
            onChange={handleSearchChange}
            prefix={<SearchOutlined />}
          />
          {filteredFavorites.length > 0 ? (
            <List
              dataSource={filteredFavorites}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <Button type="link" onClick={() => onToggleFavorite(item)} className='delete-icon'>
                      <DeleteOutlined />
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<img src={item.image} alt={item.title} style={{ width: '50px', height: 'auto' }} />}
                    title={item.title}
                  />
                </List.Item>
              )}
            />
          ) : (
            <div>No favorite items yet.</div>
          )}
        </div>
      )}
    </>
  );
};

export default FavoriteItems;