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
        </div>
        <button 
          onClick={() => this.props.onNextBoard({
            currentLevel: this.props.currentLevel,
            dungeonFloors: this.props.dungeonFloors
          })}
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
    dungeonFloors: store.playBoard.dungeonFloors
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    onNextBoard: cycleLevel
  }, dispatch);
}

// function mapStoreToProps(store) {
//   return {
//     rows: store.playBoard.rows,
//     cols: store.playBoard.cols,
//     playField: store.playBoard.playField,
//   };
// }

export default connect(mapStoreToProps, mapDispatchToProps)(Buttons);