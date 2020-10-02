import React from "react";
import Popup from "reactjs-popup";

import "./App.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Button from "@material-ui/core/Button";

import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import Divider from "@material-ui/core/Divider";

class App extends React.Component {
  state = {
    x: 1,
    pomodoroTimer: 25,
    shortbreakTimer: 5,
    longbreakTimer: 5,
    timestarted: false,
    selectedItem: 1,
    maxpomodoro: 0,
    maxshort: 0,
    maxlong: 0,
  };

  componentDidMount() {
    this.setState({
      maxpomodoro: this.state.pomodoroTimer,
      maxshort: this.state.shortbreakTimer,
      maxlong: this.state.longbreakTimer,
    });
  }

  onNumberChange = (e) => {
    this.setState({
      pomodoroTimer: e.target.value * 60,
      maxpomodoro: e.target.value,
    });
  };
  shortchanger = (x) => {
    this.setState({
      shortbreakTimer: x.target.value * 60,
      maxshort: x.target.value,
    });
  };
  longchanger = (y) => {
    this.setState({
      longbreakTimer: y.target.value * 60,
      maxlong: y.target.value,
    });
  };

  pomodoro = () => {
    this.setState({ selectedItem: 1, timestarted: false });
    clearInterval(this.interval);
  };

  short = () => {
    this.setState({ selectedItem: 2, timestarted: false });
    clearInterval(this.interval);
  };

  long = () => {
    this.setState({ selectedItem: 3, timestarted: false });
    clearInterval(this.interval);
  };

  beep = () => {
    var snd = new Audio(
      "data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
    );
    snd.play();
    setTimeout(() => {
      snd.currentTime = 0;
      snd.play();
    }, 500);
    setTimeout(() => {
      snd.currentTime = 0;
      snd.play();
    }, 250);
  };

  start = () => {
    var { timestarted } = this.state;
    this.setState({ timestarted: !timestarted });
    if (timestarted) {
      clearInterval(this.interval);
    } else {
      this.interval = setInterval(() => {
        var {
          selectedItem,
          pomodoroTimer,
          shortbreakTimer,
          longbreakTimer,
          timestarted,
          x,
        } = this.state;
        x = x + 1;
        switch (selectedItem) {
          case 1:
            pomodoroTimer = pomodoroTimer - 1;
            if (pomodoroTimer === 0) {
              this.beep();
              if (x % 6 === 0) {
                selectedItem = 3;
                longbreakTimer = 10;
              } else {
                selectedItem = 2;
                shortbreakTimer = 5;
              }
            }
            break;
          case 2:
            shortbreakTimer = shortbreakTimer - 1;
            if (shortbreakTimer === 0) {
              this.beep();
              selectedItem = 1;
              pomodoroTimer = 25;
            }
            break;
          case 3:
            longbreakTimer = longbreakTimer - 1;
            if (longbreakTimer === 0) {
              this.beep();
              selectedItem = 1;
              pomodoroTimer = 25;
            }
            break;
          default:
            break;
        }
        if (pomodoroTimer === 0) {
          clearInterval(this.interval);
          pomodoroTimer = this.state.maxpomodoro;
          timestarted = false;
        }
        if (shortbreakTimer === 0) {
          clearInterval(this.interval);
          shortbreakTimer = this.state.maxshort;
          timestarted = false;
        }
        if (longbreakTimer === 0) {
          clearInterval(this.interval);
          longbreakTimer = this.state.maxlong;
          timestarted = false;
        }
        this.setState({
          selectedItem,
          pomodoroTimer,
          shortbreakTimer,
          longbreakTimer,
          timestarted,
          x,
        });
      }, 1000);
    }
  };

  render() {
    const {
      selectedItem,
      pomodoroTimer,
      shortbreakTimer,
      longbreakTimer,
      timestarted,
      maxpomodoro,
      maxshort,
      maxlong,
    } = this.state;
    var mainClass = "";
    var sec = 0;
    var buttonTxt = timestarted ? "STOP" : "START";
    var widthdivider = 0;
    switch (selectedItem) {
      case 1:
        mainClass = "pomodoro";
        sec = pomodoroTimer;
        widthdivider = ((maxpomodoro - pomodoroTimer) / maxpomodoro) * 50 + "%";
        break;
      case 2:
        mainClass = "short";
        sec = shortbreakTimer;
        widthdivider = ((maxshort - shortbreakTimer) / maxshort) * 50 + "%";
        break;
      case 3:
        mainClass = "long";
        sec = longbreakTimer;
        widthdivider = ((maxlong - longbreakTimer) / maxlong) * 50 + "%";
        break;
      default:
        break;
    }

    console.log(widthdivider);
    return (
      <div className={"App " + mainClass}>
        <div className="nav">
          <div id="nav1">
            <CheckCircleIcon className="icon1"></CheckCircleIcon>
            <h1>Pomofocus</h1>
          </div>
          <div id="nav2">
            <Popup
              trigger={
                <Button
                  variant="contained"
                  className="buttonset"
                  startIcon={<SettingsOutlinedIcon />}
                >
                  setting
                </Button>
              }
              position="top center"
              modal
              contentStyle={{
                backgroundColor: "transparent",
                padding: "0px",
                width: "0px",
                display: "flex",
                flexDirection: "column",
                borderWidth: "0px",
              }}
            >
              {(close) => (
                <div className="divofsetting">
                  <p>Timer setting </p>

                  <Divider className="lin2"></Divider>
                  <p className="p2">Time (minutes)</p>
                  <div className="inp">
                    <div className="settingofinp">
                      <label className="p3">pomodor</label>
                      <input
                        type="number"
                        value={this.state.maxpomodoro}
                        onChange={this.onNumberChange}
                        className="inputbox"
                      />
                    </div>
                    <div className="settingofinp">
                      <label className="p3">Short break</label>
                      <input
                        type="number"
                        value={this.state.maxshort}
                        onChange={this.shortchanger}
                        className="inputbox"
                      />
                    </div>
                    <div className="settingofinp">
                      <label className="p3">Long break</label>
                      <input
                        type="number"
                        value={this.state.maxlong}
                        onChange={this.longchanger}
                        className="inputbox"
                      />
                    </div>
                  </div>
                  <button className="ok" onClick={close}>
                    OK
                  </button>
                </div>
              )}
            </Popup>
          </div>
        </div>
        <div className="divContainer">
          <Divider className="lin"></Divider>
          <Divider className="biglin" style={{ width: widthdivider }}></Divider>
        </div>

        <div id="time">
          <div id="timestart">
            <div className="button123">
              <button className="b1" onClick={this.pomodoro}>
                Pomodoro
              </button>
              <button className="b1" onClick={this.short}>
                Short Break
              </button>
              <button className="b1" onClick={this.long}>
                Long Break
              </button>
            </div>
            <div id="timenum">
              <h2>
                {Math.floor(sec / 60) + ":" + ("0" + (sec % 60)).slice(-2)}
              </h2>
            </div>
            <div id="buttonstart">
              <button id="b2" onClick={this.start}>
                {buttonTxt}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
