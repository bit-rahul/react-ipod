import React from 'react';
// Importing Components
import Main from './components/Main';
import NotificationBar from './components/NotificationBar'
import ControlKeys from './components/ControlKeys';
// Importing CSS file
import './App.css';

export default class App extends React.Component {
  constructor() {
    super();
    // Initial State
    this.state = {
      hideMenu: false,
      // Menu List
      menuList: {
        menuName: "iPod",
        isActive: true,
        backgroundImg: "https://i.stack.imgur.com/4OREd.png",
        // Main Menu options
        menuOptions: [
          {
            item: "Cover Flow",
            isSelected: true,
            backgroundImg: "https://i.stack.imgur.com/4OREd.png"
          },
          {
            item: "Music",
            isSelected: false,
            // Music Sub-Menu options
            menuList: {
              menuName: "Music",
              isActive: false,
              backgroundImg: "https://i.pinimg.com/originals/1c/e4/c8/1ce4c8a443d1782e1129c1e4c9215645.jpg",
              menuOptions: [
                {
                  item: "All Songs",
                  isSelected: true,
                  backgroundImg: "https://img.wynk.in/unsafe/720x251/filters:no_upscale():format(jpg)/http://s3.ap-south-1.amazonaws.com/discovery-prod-arsenal/arsenal/artworks/5f8d8e80e43df77c84e9d85a/BANNER_2146723918669977.png"
                },
                {
                  item: "Albums",
                  isSelected: false,
                  backgroundImg: "https://beehy.pe/wp-content/uploads/2020/01/Best-of-2019-beehype-1.jpg"
                },
                {
                  item: "Artists",
                  isSelected: false,
                  backgroundImg: "https://static.billboard.com/static/charts/decade-end/Top-Artists-306x180.jpg"
                }
              ]
            }
          },
          {
            item: "Games",
            isSelected: false,
            backgroundImg: "https://cdn2.iconfinder.com/data/icons/apps-3/512/Mac_Game_Center.png"
          },
          {
            item: "Settings",
            isSelected: false,
            backgroundImg: "https://cdn.iconscout.com/icon/free/png-256/apple-settings-1-493162.png"
          },
          {
            item: "Developer",
            isSelected: false,
            backgroundImg: "https://www.flaticon.com/svg/static/icons/svg/25/25231.svg"
          }
        ]
      }
    };
  }

  // Control keys' handler
  keyAction = (event) => {
    switch (event) {
      // Menu button action
      case "menu":
        // Hide Menu
        if (this.state.hideMenu) {
          this.setState({ hideMenu: false });
        }
        // Go back to Main Menu (from Music Sub-Menu)
        else if (!this.state.menuList.isActive) {
          let { menuList } = this.state;
          let innerMenu = menuList.menuOptions[1].menuList;
          let options = innerMenu.menuOptions;
          for (let i = 0; i < options.length; i++) {
            options[i].isSelected = false;
          }
          options[0].isSelected = true;
          innerMenu.isActive = false;
          menuList.isActive = true;
          this.setState({ menuList });
        }
        break;
      // OK/ Select Button action
      case "select":
        let { menuList } = this.state;
        // If Main Menu
        if (menuList.isActive) {
          // If Music Menu
          if (menuList.menuOptions[1].isSelected) {
            menuList.isActive = false;
            menuList.menuOptions[1].menuList.isActive = true;
            this.setState({ menuList: menuList });
          }
          // Else hide Menu
          else {
            this.setState({ hideMenu: true });
          }
        }
        // Else hide Menu
        else {
          this.setState({ hideMenu: true });
        }
        break;
      // Play/Pause Button Action
      case "play-pause":
        if (this.state.hideMenu) {
          let allSongs = this.state.menuList.menuOptions[1].menuList.menuOptions[0];
          // If All Songs selected (Music Player Screen)
          if (allSongs.isSelected) {
            // Fetching the Audio element by Tag
            let audio = document.getElementsByTagName("audio")[0];
            // Toggle between Play/Pause
            if (audio.paused) {
              audio.play();
            } else {
              audio.pause();
            }
          }
        }
        break;
      // Fast-Forward Button Action
      case "forward":
        if (this.state.hideMenu) {
          let allSongs = this.state.menuList.menuOptions[1].menuList.menuOptions[0];
          // If All Songs selected (Music Player Screen)
          if (allSongs.isSelected) {
            // Fetching the Audio element by Tag
            let audio = document.getElementsByTagName("audio")[0];
            // Fetching total duration of the song
            let totalDuration = audio.duration;
            // Current Play time
            let currentTime = audio.currentTime;
            // Fast-Forward by 10 secs
            currentTime = (currentTime + 10 < totalDuration) ? currentTime + 10 : totalDuration;
            //Updating Current Play Time
            audio.currentTime = currentTime;
          }
        }
        break;
      // Fast-Rewind Button Action
      case "rewind":
        if (this.state.hideMenu) {
          let allSongs = this.state.menuList.menuOptions[1].menuList.menuOptions[0];
          // If All Songs selected (Music Player Screen)
          if (allSongs.isSelected) {
            // Fetching the Audio element by Tag
            let audio = document.getElementsByTagName("audio")[0];
            // Fetching total duration of the song
            let totalDuration = audio.duration;
            // Current Play time
            let currentTime = audio.currentTime;
            // Fast-Forward by 10 secs
            currentTime = (currentTime - 10 < totalDuration) ? currentTime - 10 : totalDuration;
            //Updating Current Play Time
            audio.currentTime = currentTime;
          }
        }
        break;
      // Rotate Scroll/Touch button action
      case 1:
      case -1:
        // If Menu is hidden, change volume of music player
        if (this.state.hideMenu) {
          let allSongs = this.state.menuList.menuOptions[1].menuList.menuOptions[0];
          // Check if Music Player is selected
          if (this.state.menuList.menuOptions[1].menuList.isActive && allSongs.isSelected) {
            let audio = document.getElementsByTagName("audio")[0];
            //Increase or Decrease Volume
            console.log(audio.volume, "volume");
            let volumeChanger = event === 1 ? 0.1 : -0.1;
            volumeChanger += audio.volume;
            volumeChanger = volumeChanger > 1 ? 1 : (volumeChanger < 0 ? 0 : volumeChanger);
            audio.volume = volumeChanger;
          }
          return;
        }
        // Else scroll menu options
        else {
          let index;
          let { menuList } = this.state;
          // Check for Main Menu or Music Menu
          let options = menuList.isActive ? menuList.menuOptions : menuList.menuOptions[1].menuList.menuOptions;
          // Find current active option
          for (let i = 0; i < options.length; i++) {
            if (options[i].isSelected) {
              index = i;
              break;
            }
          }
          // Making current option inactive
          options[index].isSelected = false;
          // Check for clockwise/ anti-clockwise action. If clockwise, then activate next option, else activate previous option
          let nexIndex = event === 1 ? (index + 1) % options.length : (index > 0 ? index - 1 : options.length - 1);
          options[nexIndex].isSelected = true;
          this.setState({ menuList });
        }
        break;
      default:
        console.log("Input not defined!");
    }
  }

  render() {
    const { hideMenu, menuList } = this.state;
    return (
      <div className="App">
        <div className="main-ipod">
          <div className="screen-bordered">
            <div className="main-display">
              {/* Notifications Bar of display */}
              <NotificationBar />
              {/* Main Display Body */}
              <Main hideMenu={hideMenu} menuList={menuList} key={menuList.menuName} />
            </div>
          </div>
          {/* Control Keys */}
          <ControlKeys actionHandler={this.keyAction} />
        </div>
        <div className="reflection" id="ref"></div>
      </div>
    );
  }
}