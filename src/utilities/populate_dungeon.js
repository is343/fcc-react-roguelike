import _ from 'lodash';
import { BOX_KEY } from '../actions';

const NUM_OF = {
  ENEMY: 15,
  WEAPON: 5,
  HEALTH: 10,
  HOLE: 1,
  BOSS: 1,
  PLAYER: 1
};

export default function populateDungeon(board, rows, cols, currentLevel){
  // populates the floor with random amounts of each item
  // returns the board and the player location
  // arr, ints -> object(of arrays)
  let stats = {
    itemStats: { weapons: [NUM_OF.WEAPON], health: [NUM_OF.HEALTH], enemies: [NUM_OF.ENEMY] },
    enemyStats: null
  }
  let boardCopy = _.cloneDeep(board);
  let boardAndEnemyStats = populateOne(boardCopy, rows, cols, currentLevel, BOX_KEY.ENEMY, NUM_OF.ENEMY);
  boardCopy = boardAndEnemyStats.board;
  // update stats
  stats.enemyStats = boardAndEnemyStats.enemyStats;
  boardCopy = populateOne(boardCopy, rows, cols, currentLevel, BOX_KEY.WEAPON, NUM_OF.WEAPON);
  boardCopy = populateOne(boardCopy, rows, cols, currentLevel, BOX_KEY.HEALTH, NUM_OF.HEALTH);
  // DECIDED TO GO WITH A HOLE DOWN TO THE NEXT LEVEL
  // AND TO NOT ALLOW THE PLAYER TO GO BACK UP TO THE PREVIOUS LEVEL
  ////////////////////////////////////////
  // if(currentLevel !== 1){
  //   boardCopy = populateOne(boardCopy, rows, cols, currentLevel, BOX_KEY.STAIR_UP, 1);
  // }
  ////////////////////////////////////////
  if (currentLevel !== 5) {
    boardCopy = populateOne(boardCopy, rows, cols, currentLevel, BOX_KEY.HOLE, NUM_OF.HOLE);
  }
  if(currentLevel === 5){
    boardCopy = populateOne(boardCopy, rows, cols, currentLevel, BOX_KEY.BOSS, NUM_OF.BOSS);
  }
  let boardAndPlayerLocs = populateOne(boardCopy, rows, cols, currentLevel, BOX_KEY.PLAYER, NUM_OF.PLAYER);
  return {...boardAndPlayerLocs, stats};
}

function populateOne(board, rows, cols, currentLevel, item, numberOf){
  // picks a random box, if ground it will place an item
  // if enemy, also returns enemy stats
  // if it is placing the player, also return the location 
  // arr, ints -> array -or- object (of arrays)
  let boardCopy = _.cloneDeep(board);
  let randomRow;
  let randomCol;
  let enemyList = [];
  let enemy;
  let enemyIndex = 0;
  while(numberOf > 0){
    randomRow = _.random(rows - 1);
    randomCol = _.random(cols - 1);
    if(boardCopy[randomRow][randomCol] === BOX_KEY.GROUND){
      boardCopy[randomRow][randomCol] = item;
      numberOf--;
      if( item == BOX_KEY.ENEMY){
        enemy = [{loc: [randomRow, randomCol], index: enemyIndex, health: (currentLevel * 15)}];
        enemyList.push(enemy);
        enemyIndex++;
      }
    }
  }
  if (item === BOX_KEY.PLAYER){
    return { board: boardCopy, playerLocations: [randomRow, randomCol]};
  }
  if (item === BOX_KEY.ENEMY){
    return { board: boardCopy, enemyStats: { enemies: enemyList, bossHealth: 200 } };
  }
  return boardCopy;
}
