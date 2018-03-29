import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { cycleLevel, toggleDarkness } from '../actions';

class Buttons extends Component {
  render(){
    return (
      <div className='center'>
        <div>
          Current Level: {this.props.currentLevel}
          <br/>
          Player Coordinates: {this.props.playerLocations[this.props.currentLevel - 1][0]},
          {this.props.playerLocations[this.props.currentLevel - 1][1]}
        </div>
        <button 
          onClick={() => this.props.onNextBoard(this.props.currentLevel,
            this.props.dungeonFloors
          )}
        >
          Next Level
        </button>
        <button
          onClick={() => this.props.toggleDarkness(this.props.darkness)}
        >
          Toggle Darkness
        </button>
      </div>
      
    )
  }
}

function mapStoreToProps(store){
  return{
    currentLevel: store.playBoard.currentLevel,
    dungeonFloors: store.playBoard.dungeonFloors,
    playerLocations: store.playBoard.playerLocations,
    darkness: store.playBoard.darkness
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    onNextBoard: cycleLevel,
    toggleDarkness: toggleDarkness
  }, dispatch);
}


export default connect(mapStoreToProps, mapDispatchToProps)(Buttons);