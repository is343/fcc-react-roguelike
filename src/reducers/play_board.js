import createDungeonLevel from '../utilities/create_dungeon';
import createDungeonFloors from '../utilities/dungeon_floors';
import { DISPATCH_KEYS } from '../actions';

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
  playerLocations: playerLocations,
  darkness: true
};

const playBoardReducer = (state=defaultState, action) => {
  switch(action.type) {
    case DISPATCH_KEYS.CYCLE_LEVEL:
      let {currentLevel, playField} = action.payload;
      state = {...state, currentLevel, playField};
    case DISPATCH_KEYS.TOGGLE_DARKNESS:
      let darkness = action.payload;
      state = {...state, darkness};
  }
  return state;
}

export default playBoardReducer;
