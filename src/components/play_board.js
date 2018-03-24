import React, { Component } from "react";
import { connect } from 'react-redux';
import Box from "./box";

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
        console.log("row", row_index);
        console.log("col", col_index);
        // test the bool of each box and put the corresponding class
        let boxClass = this.props.playField[row_index][col_index]
          ? "box on"
          : "box off"; // spaces between classes for multiples
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
