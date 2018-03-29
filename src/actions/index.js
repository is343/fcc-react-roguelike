import playerMovement from '../utilities/player_movement';

export const BOX_KEY = {
  WALL: 0, 
  GROUND: 1, 
  ENEMY: 2, 
  WEAPON: 3, 
  HEALTH: 4, 
  STAIR_UP: 5, // CURRENTLY NOT USED
  HOLE: 6, 
  BOSS: 7, 
  PLAYER: 8, 
  OUTER: 9 
};

export const DISPATCH_KEYS = {
  CYCLE_LEVEL: 'CYCLE_LEVEL',
  TOGGLE_DARKNESS: 'TOGGLE_DARKNESS',
  MOVE_PLAYER: 'MOVE_PLAYER'
  
};

export function cycleLevel(currentLevel, dungeonFloors){
  // cycles through currently displayed level
  // array and int -> obj (dispatch) of arrs
  if (currentLevel < dungeonFloors.length){
    currentLevel++;
  } else {
    currentLevel = 1;
  }
  return{
    type: DISPATCH_KEYS.CYCLE_LEVEL,
    payload: {
      currentLevel: currentLevel,
      playField: dungeonFloors[currentLevel-1]
    }
  }
}

export function toggleDarkness(darkness){
  // returns the opposite of what's input
  // bool -> obj (dispatch) of bool
  return{
    type: DISPATCH_KEYS.TOGGLE_DARKNESS,
    payload: !darkness
  }
}

export function handleMovement(boards, currentLevel, keyCode, playerLocations){
  // moves the player in the direction pressed
  // updates levels and player locations
  // arrs, ints -> obj (dispatch) of arrs
  let getBoard = playerMovement(boards, currentLevel, keyCode, playerLocations);
  let {updatedBoard, updatedLocations} = getBoard;
  return{
    type: DISPATCH_KEYS.MOVE_PLAYER,
    payload: {
      newPlayField: updatedBoard[currentLevel - 1],
      dungeonFloors: updatedBoard,
      playerLocations: updatedLocations
    }
  }
}