import createDungeonLevel from '../utilities/empty_board';
import createDungeonFloors from '../utilities/dungeon_floors';
import { CYCLE_LEVEL } from '../actions';

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
    case CYCLE_LEVEL:
      let {currentLevel, playField} = action.payload;
      state = {...state, currentLevel: currentLevel, playField: playField};    
  }
  return state;
}

export default playBoardReducer;
