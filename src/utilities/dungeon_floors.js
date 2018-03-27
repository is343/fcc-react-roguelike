import createDungeonLevel from '../utilities/empty_board';

export default function createDungeonLevels(rows, cols){
  let dungeonLevels = [];
  for(let i = 0; i < 5; i++){
    dungeonLevels.push(createDungeonLevel(rows, cols));
  }
  return dungeonLevels;
}