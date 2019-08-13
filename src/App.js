import React from "react";
import logo from "./imgs/fredlogo512x512.png";
import "./App.css";
import Todo from "./Todo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Todo />
      </header>
    </div>
  );
}

export default App;
