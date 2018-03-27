
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