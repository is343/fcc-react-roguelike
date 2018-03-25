import createDungeonLevel from '../utilities/empty_board';
import createDungeonFloors from '../utilities/dungeon_floors';

const something= 'something';

const rows = 50;
const cols = 75;
const dungeonFloors = createDungeonFloors(rows, cols);

const defaultState = {
  currentLevel: 1,
  playField: dungeonFloors[0],
  rows: rows,
  cols: cols,
  dungeonFloors: dungeonFloors,
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


// CREATE BUTTONS TO SWITCH BETWEEN FLOORS