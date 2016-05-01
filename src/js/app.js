import React from "react";
import ReactDom from "react-dom";
import Footer from "./footer.js";
import GithubCorner from "react-github-corner";

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
    Notification.requestPermission();
  },

  elapseTime() {
    if (this.state.time === 0) {
      this.reset(0);
      this.alert();
    }
    if (this.state.play === true) {
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

  formatType(timeType) {
    let timeTypeFormated;
    if(timeType === 1500){timeTypeFormated = "code";}
    if(timeType === 300){timeTypeFormated = "social";}
    if(timeType === 900){timeTypeFormated = "coffee";}
    return timeTypeFormated;
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
    // vibration
    if(this.refs.vibrate.checked) {
      window.navigator.vibrate(1000);
    }
    // audio
    if(this.refs.audio.checked) {
      let audio = new Audio('songs/alarm.mp3');
      audio.play();
      setTimeout(()=> audio.pause(), 1400);
    }
    // notification
    if(this.refs.notification.checked) {
      if (this.state.timeType === 1500) {
        let notification = new Notification("Relax :)", {
          icon: "img/coffee.png",
          lang: "en",
          body: "Go talk or drink a coffe."
        });
      } else {
        let notification = new Notification("The time is over!", {
          icon: "img/code.png",
          lang: "en",
          body: "Hey, back to code!"
        });
      }
    }
  },

  render() {
    return (
      <div className="pomodoro">
        <GithubCorner
          href="https://github.com/afonsopacifer/react-pomodoro"
          bannerColor="#2BA0A0"
          octoColor="#272727"
        />

        {/* Main section
        ------------------------------- */}
        <div className="main">

          <div className="container display">
            <span className="time">{this.format(this.state.time)}</span>
            <span className="timeType">The {this.formatType(this.state.timeType)} time!</span>
          </div>

          <div className="container">
            <button className="btn" onClick={this.setTime.bind(this, 1500)}>Code</button>
            <button className="btn" onClick={this.setTime.bind(this, 300)}>Social</button>
            <button className="btn" onClick={this.setTime.bind(this, 900)}>Coffee</button>
          </div>

        </div> {/* main */}

        {/* Bottom section
        ------------------------------- */}
        <div class="bottomBar">

          <div className="controls">
            <div className="container">

              <div className="controlsPlay">
                <button className="play btnIcon" onClick={this.play}></button>
                <button className="stop btnIcon" onClick={this.reset.bind(this, this.state.time)}></button>
              </div>

              <div className="controlsCheck">

                <span className="check">
                  <input type="checkbox" ref="notification" id="notification"/>
                  <label for="notification"></label>
                  <span className="checkTitle" >Notification</span>
                </span>

                <span className="check">
                  <input type="checkbox" ref="audio" id="audio"/>
                  <label for="audio"></label>
                  <span className="checkTitle">Sound</span>
                </span>

                <span className="check">
                  <input type="checkbox" ref="vibrate" id="vibrate"/>
                  <label for="vibrate"></label>
                  <span className="checkTitle">Vibration</span>
                </span>

              </div> {/* controlsCheck */}

            </div> {/* container */}
          </div> {/* controls */}

          <Footer />

        </div> {/* bottomBar */}

      </div> /* bottomBar */
    )
  }

});

ReactDom.render(<Pomodoro/>, document.getElementById('app'));
