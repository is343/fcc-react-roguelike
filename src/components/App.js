import React, { Component } from 'react';
import './App.css';
import PlayField from './play_board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PlayField />
      </div>
    );
  }
}

export default App;
