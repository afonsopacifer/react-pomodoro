import React from "react";
import ReactDom from "react-dom";

const Pomodoro = React.createClass({

  getInitialState () {
    return {
      time: 0,
      play: false,
      timeType: 0
    };
  },

  componentDidMount() {
    this.setTime(1500);
  },

  elapseTime() {
    if (this.state.time === 0) {
      this.reset(0);
      this.alert();
    }
    if (this.state.play == true) {
      let newState = this.state.time - 1;
      this.setState({time: newState});
    }
  },

  format(seconds) {
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 3600 % 60);
    let timeFormated = ((m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s;
    return timeFormated;
  },

  play() {
    clearInterval(this.interval);
    this.interval = setInterval(this.elapseTime, 1000);
    this.setState({play: true});
  },

  reset(resetFor) {
    clearInterval(this.interval);
    let time = this.format(resetFor);
    this.setState({play: false});
  },

  setTime(newTime) {
    this.reset(newTime);
    this.setState({time: newTime, timeType: newTime});
  },

  alert() {

    if(this.refs.vibrate.checked){
      window.navigator.vibrate(1000);
    }

    if(this.refs.audio.checked){
      let audio = new Audio('alarm.mp3');
      audio.play();
      setTimeout(()=> audio.pause(), 1400);
    }

    if(this.refs.notification.checked){
      if (this.state.timeType == 1500) {
        let notification = new Notification("Relax :)", {icon: "coffee.png", lang: "en", body: "Go talk or drink a coffe."});
      } else {
        let notification = new Notification("The time is over!", {icon: "code.png", lang: "en", body: "Hey, back to code!"});
      }
    }

  },

  render() {
    return (
      <div>
        <span>{this.format(this.state.time)}</span>
        <button onClick={this.setTime.bind(this, 1500)}>Code</button>
        <button onClick={this.setTime.bind(this, 300)}>Social</button>
        <button onClick={this.setTime.bind(this, 900)}>Coffee</button>
        <button onClick={this.play}>Play</button>
        <button onClick={this.reset.bind(this, this.state.time)}>Pause</button>
        <input type="checkbox" ref="vibrate"/>Notification
        <input type="checkbox" ref="audio"/>Sound
        <input type="checkbox" ref="notification"/>Vibration
      </div>
    )
  }

});

ReactDom.render(<Pomodoro/>, document.getElementById('app'));
