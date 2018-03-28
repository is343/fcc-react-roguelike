import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { cycleLevel } from '../actions';

class Buttons extends Component {
  render(){
    return (
      <div>
        <div>
          Current Level: {this.props.currentLevel}
          <br/>
          Player Coordinates: {this.props.playerLocations[this.props.currentLevel-1]}
        </div>
        <button 
          onClick={() => this.props.onNextBoard(this.props.currentLevel,
            this.props.dungeonFloors
          )}
        >
          Next Level
        </button>
      </div>
      
    )
  }
}

function mapStoreToProps(store){
  return{
    currentLevel: store.playBoard.currentLevel,
    dungeonFloors: store.playBoard.dungeonFloors,
    playerLocations: store.playBoard.playerLocations
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    onNextBoard: cycleLevel
  }, dispatch);
}


export default connect(mapStoreToProps, mapDispatchToProps)(Buttons);