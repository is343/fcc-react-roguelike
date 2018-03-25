import createDungeonLevel from '../utilities/empty_board';

const something= 'something';

const rows = 50;
const cols = 75;


const defaultState = {
  currentLevel: 1,
  // creating the grid by filling the array with rows
  // then going through each row and filling with columns
  // with false (a box that is off)
  playField: createDungeonLevel(rows, cols),
  rows: rows,
  cols: cols,
  levelHistory: {}
};

const playBoardReducer = (state=defaultState, action) => {
  switch(action.type) {
    case something:
      return state;
    
  }
  return state;
}

export default playBoardReducer;