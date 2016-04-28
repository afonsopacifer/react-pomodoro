import React from "react";
import ReactDom from "react-dom";

// <Timer />
// ----------------------------------
const Timer = React.createClass({

  getInitialState () {
    return {
      time: this.props.time,
      timeFormated: null
    };
  },

  componentDidMount() {
    setInterval(this.elapse, 1000);
  },

  elapse() {
    //time elapse
    let oldState = this.state.time;
    let newState = oldState - 1;

    //time format
    let m = Math.floor(newState % 3600 / 60);
    let s = Math.floor(newState % 3600 % 60);
    let timeFormated = ((m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s;

    this.setState({
      time: newState,
      timeFormated:timeFormated
    });
  },

  componentWillReceiveProps(nextProps) {
    this.setState({time: nextProps.time});
  },

  render() {
    return (
      <span>
        {this.state.timeFormated}
      </span>
    )
  }

});

// <Pomodoro />
// ----------------------------------
const Pomodoro = React.createClass({

  getInitialState () {
    return {time: null};
  },

  componentDidMount() {
    this.setState({time: 1500});
  },

  setTime(newTime) {
    this.setState({time: newTime});
  },

  render() {
    return (
      <div>
        <Timer time={this.state.time}/>
        <button onClick={this.setTime.bind(this, 1500)}>Focus</button>
        <button onClick={this.setTime.bind(this, 300)}>Short Break</button>
        <button onClick={this.setTime.bind(this, 900)}>Long Break</button>
      </div>
    )
  }

});

ReactDom.render(<Pomodoro/>, document.getElementById('app'));
