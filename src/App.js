// import logo from "./logo.svg";
import React, { Component } from "react";
import Deck from "./components/Deck";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <Deck />
      </div>
    );
  }
}
