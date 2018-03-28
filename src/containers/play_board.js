import React, { Component } from "react";
import { connect } from 'react-redux';
import Box from "../components/box";
import { BOX_KEY } from '../actions';

class PlayField extends Component {
  render() {
    // takes in the dimensions of the status of the boxes
    // and builds the grid based
    const width = this.props.cols * 11;
    let rowsArr = []; // to hold our jsx
    // let boxClass = ''; // a temp for each box's css

    // go through each number of rows and add fill with each number
    // of cols to make each box
    for (var row_index = 0; row_index < this.props.rows; row_index++) {
      for (var col_index = 0; col_index < this.props.cols; col_index++) {
        let boxId = `${row_index}-${col_index}`;
        // switch to test each box and put the corresponding class
        // created an immediately envoked function, and envoked with the box
        let boxClass = 
        ((test) => {switch(test) {
          case BOX_KEY.WALL:  // wall
            return 'box wall';
            break;
          
          case BOX_KEY.GROUND:  // ground
            return 'box ground';
            break;
          
          case BOX_KEY.ENEMY:  // enemy
            return 'box enemy';
            break;
          
          case BOX_KEY.WEAPON:  // weapon
            return 'box weapon';
            break;
          
          case BOX_KEY.HEALTH:  // health
            return 'box health';
            break;
          
          case BOX_KEY.STAIR_UP:  // stairs up
            return 'box stair-up';
            break;
          
          case BOX_KEY.HOLE:  // Hole down
            return 'box stair-down';
            break;
          
          case BOX_KEY.BOSS:  // boss
            return 'box boss';
            break;
          
          case BOX_KEY.PLAYER:  // player
            return 'box player';
            break;

          case BOX_KEY.OUTER:  // outer wall
            return 'box outer';
          // spaces between the classes for multiples
          // needs box class and whatever else class
          
        }
        })(this.props.playField[row_index][col_index]);

        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={row_index}
            col={col_index}
          />
        );
      }
    }

    return (
      <div className="grid" style={{ width: width }}>
        {rowsArr}
      </div>
    );
  }
}

function mapStoreToProps(store){
  return{
    rows: store.playBoard.rows,
    cols: store.playBoard.cols,
    playField: store.playBoard.playField,
  };
}


export default connect(mapStoreToProps)(PlayField);
