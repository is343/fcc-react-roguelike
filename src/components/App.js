import React, { Component } from 'react';
import '../style/App.css';
import PlayField from '../containers/play_board';
import Buttons from '../containers/buttons';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Buttons />
        <PlayField />
      </div>
    );
  }
}

export default App;
