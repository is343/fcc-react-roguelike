import createDungeonLevel from '../utilities/create_dungeon';
import populateDungeon from '../utilities/populate_dungeon';

export default function createDungeonLevels(rows, cols){
  // creates multiple levels of the dungeon
  let dungeonLevels = [];
  for(let i = 0; i < 5; i++){
    let tempLevel = createDungeonLevel(rows, cols);
    dungeonLevels.push(populateDungeon(tempLevel, rows, cols, i+1));
  }
  return dungeonLevels;
}