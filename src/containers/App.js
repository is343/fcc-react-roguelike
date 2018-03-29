import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import '../style/App.css';
import PlayField from '../containers/play_board';
import Buttons from '../containers/buttons';
import { handleMovement } from '../actions';

class App extends Component {
  onKeyPress = (e) => {
    e.preventDefault();
    this.props.onMovement(
      this.props.dungeonFloors, 
      this.props.currentLevel, 
      e.keyCode, 
      this.props.playerLocations);
  };
  componentDidMount(){
    window.addEventListener('keydown', this.onKeyPress);
  }
  componentWillMount() {
    window.removeEventListener('keydown', this.onKeyPress);
  }

  render() {
    return (
      <div>
        <Buttons />
        <PlayField />
      </div>
    );
  }
}

function mapStoreToProps(store) {
  return {
    currentLevel: store.playBoard.currentLevel,
    dungeonFloors: store.playBoard.dungeonFloors,
    playerLocations: store.playBoard.playerLocations
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onMovement: handleMovement
  }, dispatch);
}

export default connect(mapStoreToProps, mapDispatchToProps)(App);

