import createDungeonLevel from '../utilities/create_dungeon';
import createDungeonFloors from '../utilities/dungeon_floors';
import { DISPATCH_KEYS } from '../actions';

const rows = 50;
const cols = 75;
const dungeonFloorsAndPlayerLocsAndStats = createDungeonFloors(rows, cols);
const { dungeonFloors, playerLocations, stats } = dungeonFloorsAndPlayerLocsAndStats;


const defaultState = {
  currentLevel: 1,
  playField: dungeonFloors[0],
  rows: rows,
  cols: cols,
  dungeonFloors: dungeonFloors,
  playerLocations: playerLocations,
  darkness: true,
  stats: stats,
};

const playBoardReducer = (state=defaultState, action) => {
  switch(action.type) {
    case DISPATCH_KEYS.CYCLE_LEVEL:
      let {updatedCurrentLevel, playField} = action.payload;
      state = { ...state, currentLevel: updatedCurrentLevel, playField};
      break;
    case DISPATCH_KEYS.TOGGLE_DARKNESS:
      let darkness = action.payload;
      state = {...state, darkness};
      break;
    case DISPATCH_KEYS.MOVE_PLAYER:
      let { currentLevel, newPlayField, dungeonFloors, playerLocations, stats} = action.payload;
      state = { ...state, currentLevel, playField: newPlayField, dungeonFloors, playerLocations, stats };
      break;
  }
  return state;
}

export default playBoardReducer;