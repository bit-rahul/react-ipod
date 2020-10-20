import React from 'react';

export default class NotificationBar extends React.Component {
    constructor(props) {
        super(props);
        // State Initialization
        this.state = {
            currentTime: ""
        };
    }
    componentDidMount() {
        setInterval(() => {
            let date = (new Date().toLocaleTimeString('en-US', { hour12: false })).split(":");
            this.setState({
                currentTime: date[0] + ":" + date[1]
            })
        }, 1000)
    }
    render() {
        return (
            <div className="navbar">
                <div id="left" className="nav-text">
                    {this.state.currentTime}
                </div>
                <div id="right">
                    <img className="nav-icon" src="https://www.flaticon.com/svg/static/icons/svg/972/972770.svg" alt="Headphone"></img>
                    <img className="nav-icon" src="https://www.flaticon.com/svg/static/icons/svg/148/148866.svg" alt="Battery" ></img>
                </div>
            </div>
        )
    }
}
