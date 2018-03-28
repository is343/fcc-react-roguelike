import _ from 'lodash';
import { BOX_KEY } from '../actions';


export default function populateDungeon(board, rows, cols, currentLevel){
  // populates the floor with random amounts of each item
  // returns the board and the player location
  // arr, ints -> object(of arrays)
  let boardCopy = _.cloneDeep(board);
  boardCopy = populateOne(boardCopy, rows, cols, BOX_KEY.ENEMY, 15);
  boardCopy = populateOne(boardCopy, rows, cols, BOX_KEY.WEAPON, 4);
  boardCopy = populateOne(boardCopy, rows, cols, BOX_KEY.HEALTH, 8);
  // DECIDED TO GO WITH A HOLE DOWN TO THE NEXT LEVEL
  // AND TO NOT ALLOW THE PLAYER TO GO BACK UP TO THE PREVIOUS LEVEL
  ////////////////////////////////////////
  // if(currentLevel !== 1){
  //   boardCopy = populateOne(boardCopy, rows, cols, BOX_KEY.STAIR_UP, 1);
  // }
  ////////////////////////////////////////
  if (currentLevel !== 5) {
    boardCopy = populateOne(boardCopy, rows, cols, BOX_KEY.HOLE, 1);
  }
  if(currentLevel === 5){
    boardCopy = populateOne(boardCopy, rows, cols, BOX_KEY.BOSS, 1);
  }
  let boardAndPlayerLocs = populateOne(boardCopy, rows, cols, BOX_KEY.PLAYER, 1);
  return boardAndPlayerLocs;
}

function populateOne(board, rows, cols, item, numberOf){
  // picks a random box, if ground it will place the item
  // if it is placing the player, also return the location 
  // arr, ints -> array -or- object (of arrays)
  let boardCopy = _.cloneDeep(board);
  let randomRow;
  let randomCol;
  while(numberOf > 0){
    randomRow = _.random(rows - 1);
    randomCol = _.random(cols - 1);
    if(boardCopy[randomRow][randomCol] === BOX_KEY.GROUND){
      boardCopy[randomRow][randomCol] = item;
      numberOf--;
    }
  }
  if (item === BOX_KEY.PLAYER){
    return { board: boardCopy, playerLocations: [randomRow, randomCol]}
  }
  return boardCopy;
}

