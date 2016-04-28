import React from "react";
import ReactDom from "react-dom";


// <Timer />
// ----------------------------------
const Timer = React.createClass({

 getInitialState () {
    return {times: 500};
  },

  componentDidMount() {
    setInterval(this.run, 1000);
  },

  run() {
    let oldstate = this.state.times;
    let newstate = oldstate - 1;
    this.setState({times: newstate});
  },

  render() {
    return (
      <div>
        {this.state.times}
      </div>
    )
  }

});

ReactDom.render(<Timer/>, document.getElementById('app'));
