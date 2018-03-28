import createDungeonLevel from '../utilities/create_dungeon';
import createDungeonFloors from '../utilities/dungeon_floors';
import { CYCLE_LEVEL } from '../actions';

const something= 'something';

const rows = 50;
const cols = 75;
const dungeonFloorsAndPlayerLocs = createDungeonFloors(rows, cols);
const { dungeonFloors, playerLocations } = dungeonFloorsAndPlayerLocs;

const defaultState = {
  currentLevel: 1,
  playField: dungeonFloors[0],
  rows: rows,
  cols: cols,
  dungeonFloors: dungeonFloors,
  playerLocations: playerLocations
};

const playBoardReducer = (state=defaultState, action) => {
  switch(action.type) {
    case CYCLE_LEVEL:
      let {currentLevel, playField} = action.payload;
      state = {...state, currentLevel, playField};    
  }
  return state;
}

export default playBoardReducer;
