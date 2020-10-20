import React from 'react';
import Menu from './Menu';

// Main Home Component
const Main = (props) => {

  let { hideMenu, menuList } = props;
  if (!menuList.isActive)
    menuList = menuList.menuOptions[1].menuList;

  // If Menu is hidden
  if (hideMenu) {
    // Check Active option
    var opt;
    for (var i = 0; i < menuList.menuOptions.length; i++) {
      if (menuList.menuOptions[i].isSelected) {
        opt = menuList.menuOptions[i];
        break;
      }
    }
    // If All Songs/ Music Player is selected
    if (opt.item === "All Songs") {
      return (
        <div className="home">
          <div className="img-container">
            <img width="50%" src="https://upload.wikimedia.org/wikipedia/en/8/8d/Coldplay_-_A_Sky_Full_of_Stars_%28Single%29.png" alt="Music Player" />
            <audio id="audio" autoPlay controls>
              <source src="https://docs.google.com/uc?export=download&id=1gL_3WMtFTddJ6aF53SDWFgvskxHB1P60" type="audio/mpeg" />
              <p> Your browser doesn't support the audio tag </p>
            </audio>
          </div>
        </div>
      );
    }
    else {
      // If Developer Screen is selected
      if (opt.item === "Developer")
        return (
          <div className="home">
            {opt.item}
            <br />
            <img src={opt.backgroundImg} alt={opt.item} style={mainStyles.imgStyle} />
            <br />
            <a href="https://github.com/rahulsups" target="_blank">Rahul</a>
          </div>
        )
      else return (
        <div className="home">
          {opt.item}
          <br />
          <img src={opt.backgroundImg} alt={opt.item} style={mainStyles.imgStyle} />
        </div>
      );
    }
  }
  // Else render Menu
  else {
    return (
      <div className="home" style={{ backgroundImage: `url(${menuList.backgroundImg})`, objectFit: "cover" }}>
        <Menu menuList={menuList} />
      </div>
    );
  }
}
//styling 
const mainStyles = {
  imgStyle: {
    width: 200,
    height: 125,
    paddingTop: 10
  }
}
export default Main;