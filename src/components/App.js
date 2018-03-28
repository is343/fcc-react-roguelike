import React, { Component } from 'react';
import '../style/App.css';
import PlayField from '../containers/play_board';
import Buttons from '../containers/buttons';

class App extends Component {
  test = (e) => {
    console.log('keypress:', e);
  };
  componentDidMount(){
    window.addEventListener('keydown', this.test);
  }
  componentWillMount() {
    window.removeEventListener('keydown', this.test);
  }

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
