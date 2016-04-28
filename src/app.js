import React from "react";
import ReactDom from "react-dom";

// <Timer />
// ----------------------------------
const Timer = React.createClass({

  getInitialState () {
    return {time: this.props.time};
  },

  componentDidMount() {
    setInterval(this.elapse, 1000);
  },

  elapse() {
    let oldState = this.state.time;
    let newState = oldState - 1;
    this.setState({time: newState});
  },

  componentWillReceiveProps(nextProps) {
    this.setState({time: nextProps.time});
  },

  render() {
    return (
      <div>
        {this.state.time}
      </div>
    )
  }

});

// <Pomodoro />
// ----------------------------------
const Pomodoro = React.createClass({

 getInitialState () {
    return {time: 100};
  },

  setTime(newTime) {
    this.setState({time: newTime});
  },

  render() {
    return (
      <div>
        <Timer time={this.state.time}/>
        <button onClick={this.setTime.bind(this, 1000)}>Pomodoro</button>
        <button onClick={this.setTime.bind(this, 500)}>Short</button>
        <button onClick={this.setTime.bind(this, 2000)}>Long</button>
      </div>
    )
  }

});

ReactDom.render(<Pomodoro/>, document.getElementById('app'));
