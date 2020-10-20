import React from 'react';

// Menu Component
const Menu = (props) => {
  const { menuList } = props;
  return (
    <div id="menu">
      <div id="menu-heading">
        {menuList.menuName}
      </div>
      {/* Display all menu items */}
      {menuList.menuOptions.map((opt, i) => {
        if (opt.isSelected) {
          return (
            <div className="menu-item active" key={i}>
              {opt.item}
              <img className="active-menu-item" src="https://assets.dryicons.com/uploads/icon/svg/9823/2c6b3c07-59fa-4d6c-801e-1dc8de80e20f.svg" alt="Active Menu" />
            </div>
          )
        }
        else {
          return (
            <div className="menu-item" key={i}>
              {opt.item}
            </div>
          )
        }
      })}
    </div>
  );
}
//exporting menu
export default Menu;