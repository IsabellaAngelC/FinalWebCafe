import React from 'react';
import MenuItem from './MenuItem';
import { menuData } from '../data/data';

const MenuList = () => {
  return (
    <div className="menu-container">
      <h1 className="menu-title">{menuData.title}</h1>
      
      <div className="lunch-items">
        {menuData.lunchItems.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
      
      <h2 className="menu-question">{menuData.question}</h2>
      
      <div className="extras-section">
        <h3 className="extras-title">Extras</h3>
        <div className="extras-list">
          {menuData.extras.map(extra => (
            <span key={extra.id} className="extra-item">{extra.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuList;