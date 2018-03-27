import React, { Component } from "react";
import { connect } from 'react-redux';
import Box from "../components/box";

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
          case 0:  // wall
            return 'box wall';
            break;
          
          case 1:  // ground
            return 'box ground';
            break;
          
          case 2:  // enemy
            return 'box enemy';
            break;
          
          case 3:  // weapon
            return 'box weapon';
            break;
          
          case 4:  // health
            return 'box health';
            break;
          
          case 5:  // stairs up
            return 'box stair-up';
            break;
          
          case 6:  // stairs down
            return 'box stair-down';
            break;
          
          case 7:  // boss
            return 'box boss';
            break;
          
          case 8:  // player
            return 'box player';
            break;

          case 9:  // outer wall
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
