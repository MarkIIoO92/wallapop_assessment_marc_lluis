import React from 'react';
import { Card } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { ItemCardProps } from '../../types/ItemCardProps'
import { ItemProps } from '../../types/ItemProps';

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  index,
  expandedItemIndex,
  onMouseEnter,
  onMouseLeave,
  onToggleFavorite,
  favoriteItems,
}) => {
  const isFavorite = favoriteItems.some((favItem: ItemProps) => favItem.title === item.title);

  return (
    <Card
      className="item"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        height: index === expandedItemIndex ? 'auto' : '370px',
        overflow: 'hidden',
      }}
      cover={
        <div style={{ position: 'relative' }}>
          <div data-testid="item-image"
            style={{
              paddingTop: '75%', // 4/3 aspect ratio
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <span
          className={`favorite-button ${isFavorite ? 'favorite-button-filled' : ''}`}
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering other click events
            onToggleFavorite(item);
          }}
        >
          {isFavorite ? <HeartFilled /> : <HeartOutlined />}
        </span>
        </div>
      }
    >
      <h3>{item.title}</h3>
      {index === expandedItemIndex && (
        <>
          <div>{item.description}</div>
          <div>
            <strong>Price:</strong> {item.price}€
          </div>
          <div>
            <strong>Email:</strong> <a href={`mailto:${item.email}`}>{item.email}</a>
          </div>
        </>
      )}
    </Card>
  );
};

export default ItemCard;