import createDungeonLevel from '../utilities/create_dungeon';
import populateDungeon from '../utilities/populate_dungeon';

export default function createDungeonLevels(rows, cols){
  // creates multiple levels of the dungeon
  // calls and creates objects and player locations for each floor
  // ints -> object (of arrays)
  let dungeonFloors = [];
  let playerLocations = [];
  for(let i = 0; i < 5; i++){
    let tempLevel = createDungeonLevel(rows, cols);
    let tempLevelAndPlayerLocs = populateDungeon(tempLevel, rows, cols, i + 1);
    dungeonFloors.push(tempLevelAndPlayerLocs.board);
    playerLocations.push(tempLevelAndPlayerLocs.playerLocations);
  }
  return {
    dungeonFloors: dungeonFloors,
    playerLocations: playerLocations
  };
}