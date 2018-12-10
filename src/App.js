import React, { Component } from 'react';
import './App.css';
import Search from './Search'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Search.</h1>
          <Search />
        </header>
      </div>
    );
  }
}

export default App;
