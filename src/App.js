import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import Divider from "@material-ui/core/Divider";

class App extends React.Component {
  state = {
    x: 1,
    pomodoroTimer: 25,
    shortbreakTimer: 5,
    longbreakTimer: 10,
    timestarted: false,
    selectedItem: 1,
  };

  pomodoro = () => {
    this.setState({ selectedItem: 1 });
  };

  short = () => {
    this.setState({ selectedItem: 2 });
  };

  long = () => {
    this.setState({ selectedItem: 3 });
  };

  start = () => {
    this.setState({ timestarted: !this.state.timestarted });
    setInterval(() => {}, 1000);
  };

  render() {
    const {
      selectedItem,
      pomodoroTimer,
      shortbreakTimer,
      longbreakTimer,
      timestarted,
    } = this.state;
    var mainClass = "";
    var sec = 0;
    var buttonTxt = timestarted ? "STOP" : "START";

    switch (selectedItem) {
      case 1:
        mainClass = "pomodoro";
        sec = pomodoroTimer;
        break;
      case 2:
        mainClass = "short";
        sec = shortbreakTimer;
        break;
      case 3:
        mainClass = "long";
        sec = longbreakTimer;
        break;
    }

    return (
      <div className={"App " + mainClass}>
        <div className="nav">
          <div id="nav1">
            <CheckCircleIcon className="icon1"></CheckCircleIcon>
            <h1>Pomofocus</h1>
          </div>
          <div id="nav2">
            <Button
              variant="contained"
              className="buttonset"
              startIcon={<SettingsOutlinedIcon />}
            >
              setting
            </Button>
          </div>
        </div>
        <Divider className="lin"></Divider>
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
