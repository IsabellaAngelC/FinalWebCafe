import React from 'react';

const MenuItem = ({ item }) => {
  return (
    <div className="menu-item">
      <h3 className="item-type">{item.type}</h3>
      <p className="item-description">{item.description}</p>
      <p className="item-price">{item.price}</p>
    </div>
  );
};

export default MenuItem;