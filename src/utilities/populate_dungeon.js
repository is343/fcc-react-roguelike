import _ from 'lodash';
import { BOX_KEY } from '../actions';


export default function populateDungeon(board, rows, cols, currentLevel){
  let boardCopy = _.cloneDeep(board);
  boardCopy = populateOne(boardCopy, rows, cols, BOX_KEY.ENEMY, 15);
  boardCopy = populateOne(boardCopy, rows, cols, BOX_KEY.WEAPON, 4);
  boardCopy = populateOne(boardCopy, rows, cols, BOX_KEY.HEALTH, 8);
  if(currentLevel !== 1){
    boardCopy = populateOne(boardCopy, rows, cols, BOX_KEY.STAIR_UP, 1);
  }
  if (currentLevel !== 5) {
    boardCopy = populateOne(boardCopy, rows, cols, BOX_KEY.STAIR_DOWN, 1);
  }
  boardCopy = populateOne(boardCopy, rows, cols, BOX_KEY.PLAYER, 1);
  if(currentLevel === 5){
    boardCopy = populateOne(boardCopy, rows, cols, BOX_KEY.BOSS, 1);
  }
  return boardCopy;
}

function populateOne(board, rows, cols, item, numberOf){
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
  return boardCopy;
}

