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
  TOGGLE_DARKNESS: 'TOGGLE_DARKNESS'
};

export function cycleLevel(currentLevel, dungeonFloors){
  // cycles through currently displayed level
  // array and int -> obj (dispatch)
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
  // bool -> bool
  return{
    type: DISPATCH_KEYS.TOGGLE_DARKNESS,
    payload: !darkness
  }
}

export function handleMovement(board){
  return null;
}