import React from "react";
import ReactDom from "react-dom";

const Pomodoro = React.createClass({

  getInitialState () {
    return {
      time: 0,
      timeFormated: 0,
      play: false
    };
  },

  componentDidMount() {
    this.setTime(1500);
  },

  elapseTime() {
    if (this.state.time === 0) {
      this.reset(0);
    }
    if (this.state.play == true) {
      let newState = this.state.time - 1;
      let realTime = this.format(newState);
      this.setState({time: newState, timeFormated:realTime});
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
    this.setState({timeFormated:time});
  },

  setTime(newTime) {
    this.reset(newTime);
    this.setState({time: newTime});
  },

  render() {
    return (
      <div>
        <span>{this.state.timeFormated}</span>
        <button onClick={this.setTime.bind(this, 1500)}>Code</button>
        <button onClick={this.setTime.bind(this, 300)}>Social</button>
        <button onClick={this.setTime.bind(this, 900)}>Coffee</button>
        <button onClick={this.play}>Play</button>
        <button onClick={this.reset.bind(this, this.state.time)}>Pause</button>
      </div>
    )
  }

});

ReactDom.render(<Pomodoro/>, document.getElementById('app'));
