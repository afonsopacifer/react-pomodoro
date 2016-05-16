import React from "react";
import ReactDom from "react-dom";
import Footer from "./footer.js";
import GithubCorner from "react-github-corner";
import Title from 'react-title-component'

class Pomodoro extends React.Component {

  constructor() {
    super();
    this.state = {
      time: 0,
      play: false,
      timeType: 0,
      title: ''
    };
    // Bind early, avoid function creation on render loop
    this.setTimeForCode = this.setTime.bind(this, 1500);
    this.setTimeForSocial = this.setTime.bind(this, 300);
    this.setTimeForCoffee = this.setTime.bind(this, 900);
    this.reset = this.reset.bind(this);
    this.play = this.play.bind(this);
    this.elapseTime = this.elapseTime.bind(this);
  }

  componentDidMount() {
    this.setTime(1500);
    Notification.requestPermission();
  }

  elapseTime() {
    if (this.state.time === 0) {
      this.reset(0);
      this.alert();
    }
    if (this.state.play === true) {
      let newState = this.state.time - 1;
      this.setState({time: newState, title: this.getTitle(newState)});
    }
  }

  format(seconds) {
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 3600 % 60);
    let timeFormated = ((m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s;
    return timeFormated;
  }

  formatType(timeType) {
    let timeTypeFormated;
    if(timeType === 1500){timeTypeFormated = "code";}
    if(timeType === 300){timeTypeFormated = "social";}
    if(timeType === 900){timeTypeFormated = "coffee";}
    return timeTypeFormated;
  }

  restartInterval() {
    clearInterval(this.interval);
    this.interval = setInterval(this.elapseTime, 1000);
  }

  play() {
    if(this.state.play) { return false; }
    this.restartInterval();
    this.setState({play: true});
  }

  reset(resetFor = this.state.time) {
    clearInterval(this.interval);
    let time = this.format(resetFor);
    this.setState({play: false});
  }

  setTime(newTime) {
    this.restartInterval();
    this.setState({time: newTime, timeType: newTime, title: this.getTitle(newTime), play: true});
  }

  getTitle(time) {
    time = typeof time === 'undefined' ? this.state.time : time;
    let _title = this.format(time) + ' | Pomodoro timer';
    return _title;
  }

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
  }

  render() {
    return (
      <div className="pomodoro">
        <GithubCorner
          href="https://github.com/afonsopacifer/react-pomodoro"
          bannerColor="#2BA0A0"
          octoColor="#272727"
        />

        <Title render={this.state.title} />

        {/* Main section
        ------------------------------- */}
        <div className="main">

          <div className="container display">
            <span className="time">{this.format(this.state.time)}</span>
            <span className="timeType">The {this.formatType(this.state.timeType)} time!</span>
          </div>

          <div className="container">
            <button className="btn" onClick={this.setTimeForCode}>Code</button>
            <button className="btn" onClick={this.setTimeForSocial}>Social</button>
            <button className="btn" onClick={this.setTimeForCoffee}>Coffee</button>
          </div>

        </div> {/* main */}

        {/* Bottom section
        ------------------------------- */}
        <div class="bottomBar">

          <div className="controls">
            <div className="container">

              <div className="controlsPlay">
                <button className="play btnIcon" onClick={this.play}></button>
                <button className="stop btnIcon" onClick={this.reset}></button>
              </div>

              <div className="controlsCheck">

                <span className="check">
                  <input type="checkbox" ref="notification" id="notification"/>
                  <label htmlFor="notification"></label>
                  <span className="checkTitle" >Notification</span>
                </span>

                <span className="check">
                  <input type="checkbox" ref="audio" id="audio"/>
                  <label htmlFor="audio"></label>
                  <span className="checkTitle">Sound</span>
                </span>

                <span className="check">
                  <input type="checkbox" ref="vibrate" id="vibrate"/>
                  <label htmlFor="vibrate"></label>
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
}

ReactDom.render(<Pomodoro/>, document.getElementById('app'));
