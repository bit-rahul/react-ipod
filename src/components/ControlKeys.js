import React from 'react';
import ZingTouch from 'zingtouch';
import { isMobile } from 'react-device-detect';

// Controls Component
export default class Controls extends React.Component {

  // Click Handler
  handleClick = (component) => {
    this.props.actionHandler(component);
  }

  // Scroll Handler Function
  handleScroll = (actionHandler) => {
    let angle = 0
    const target = document.getElementById('controls');
    const region = new ZingTouch.Region(target);
    region.bind(target, 'rotate', function (e) {
      console.log("scroll ", angle);
      angle += e.detail.distanceFromLast;
      console.log(angle);
      if (Math.abs(angle) > 35) {
        let scrollDir = angle > 0 ? 1 : -1;
        angle = 0;
        actionHandler(scrollDir);
      }
    });
  }

  // Adding scroll handler after component is mounted
  componentDidMount() {
    if (isMobile)
      document.getElementById("controls").ontouchmove = this.handleScroll(this.props.actionHandler);
    else document.getElementById("controls").onclick = this.handleScroll(this.props.actionHandler);
  }

  render() {
    if (isMobile)
      return (
        <div id="controls" draggable="false">
          <div id="menu-button" className="unselectable" onTouchEnd={() => this.handleClick("menu")}>
            MENU
        </div>
          <div id="forward" onTouchEnd={() => this.handleClick("forward")}>
            <img src="https://assets.dryicons.com/uploads/icon/svg/9890/ecad2bdf-c4ff-49a8-ab36-792769198047.svg" alt="Fast Forward" />
          </div>
          <div id="play" onTouchEnd={() => this.handleClick("play-pause")}>
            <img src="https://assets.dryicons.com/uploads/icon/svg/9889/e516d509-1a29-4239-9ab9-74677679800f.svg" alt="Play/Pause" />
          </div>
          <div id="rewind" onTouchEnd={() => this.handleClick("rewind")}>
            <img src="https://assets.dryicons.com/uploads/icon/svg/9890/ecad2bdf-c4ff-49a8-ab36-792769198047.svg" alt="Fast Rewind" />
          </div>
          <div id="select" onTouchEnd={() => this.handleClick("select")}></div>
        </div>
      );
    else return (
      <div id="controls" draggable="false">
        <div id="menu-button" className="unselectable" onClick={() => this.handleClick("menu")}>
          MENU
        </div>
        <div id="forward" onClick={() => this.handleClick("forward")}>
          <img src="https://assets.dryicons.com/uploads/icon/svg/9890/ecad2bdf-c4ff-49a8-ab36-792769198047.svg" alt="Fast Forward" />
        </div>
        <div id="play" onClick={() => this.handleClick("play-pause")}>
          <img src="https://assets.dryicons.com/uploads/icon/svg/9889/e516d509-1a29-4239-9ab9-74677679800f.svg" alt="Play/Pause" />
        </div>
        <div id="rewind" onClick={() => this.handleClick("rewind")}>
          <img src="https://assets.dryicons.com/uploads/icon/svg/9890/ecad2bdf-c4ff-49a8-ab36-792769198047.svg" alt="Fast Rewind" />
        </div>
        <div id="select" onClick={() => this.handleClick("select")}></div>
      </div>
    );
  }
}
