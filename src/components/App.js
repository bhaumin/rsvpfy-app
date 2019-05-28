import React from "react";
// import logo from './logo.svg';
import MainMenu from "./MainMenu";
import Rsvp from "./RsvpApp";
import "../css/App.css";

class Home extends React.Component {
  static initialState = () => ({
    viewName: "Rsvp"
  });

  state = Home.initialState();

  mainMenuClickHandler = viewName => {
    this.setState({
      viewName: viewName
    });
  };

  render() {
    const { viewName } = this.state;

    return (
      <div>
        {viewName === "MainMenu" ? (
          <MainMenu onClick={this.mainMenuClickHandler} />
        ) : (
          <Rsvp onClick={this.mainMenuClickHandler} />
        )}
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
