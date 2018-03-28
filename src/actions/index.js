
export const BOX_KEY = {
  WALL: 0, 
  GROUND: 1, 
  ENEMY: 2, 
  WEAPON: 3, 
  HEALTH: 4, 
  STAIR_UP: 5, 
  STAIR_DOWN: 6, 
  BOSS: 7, 
  PLAYER: 8, 
  OUTER: 9 
};
export const CYCLE_LEVEL = 'CYCLE_LEVEL';

export function cycleLevel(currentLevelAndDungeonFloors){
  let {currentLevel, dungeonFloors} = currentLevelAndDungeonFloors;
  if (currentLevel < dungeonFloors.length){
    currentLevel++;
  } else {
    currentLevel = 1;
  }
  
  return{
    type: CYCLE_LEVEL,
    payload: {
      currentLevel: currentLevel,
      playField: dungeonFloors[currentLevel-1]
    }
  }
}