import _ from 'lodash';
import { BOX_KEY } from '../actions';

export default function createDungeonLevel(rows, cols){
  // carrys out all the functions to randomly generate a dungeon
  // ints -> arr
  var board = emptyBoard(rows, cols);
  board = outerWall(board, rows, cols);
  board = firstRoom(board, rows, cols);
  var wallCoords = findWall(board, rows, cols); // for first room
  var tries = 1000;
  while(tries > 0){
    wallCoords = findWall(board, rows, cols);
    board = checkSpace(board, wallCoords);
    tries--;
  }
  return board;
}

export function emptyBoard(rows, cols) {
  // creates a board array with all blank (false) boxes
  // updates state with a new blank board
  // ints -> array
  let blankBoard = Array(rows)
    .fill()
    .map(() => Array(cols).fill(BOX_KEY.WALL));
  return blankBoard;
};

export function outerWall(board, rows, cols){
  // creates the outer walls
  // sets the perimeter of the grid to 9
  // arr, ints -> arr
  let newBoard = _.cloneDeep(board);
  for (let c = 0; c < cols; c++) {
    newBoard[0][c] = BOX_KEY.OUTER;
    newBoard[rows - 1][c] = BOX_KEY.OUTER;
  }
  for (let r = 0; r < rows; r++) {
    newBoard[r][0] = BOX_KEY.OUTER;
    newBoard[r][cols - 1] = BOX_KEY.OUTER;
  }
  return newBoard;
}



export function firstRoom(board, rows, cols) {
  // creates a 5x5 room to start 
  // randomly selects the where to build the first room
  // arr, ints -> arr
  let boardCopy = _.cloneDeep(board);
  // randomly decide where to start the board
  const start = _.random(4);
  if(start === 0){ // first room is in the center
    const midRow = Math.floor(rows / 2);
    const midCol = Math.floor(cols / 2);
    for(let r = midRow + 2; r > midRow -3; r--){
      for (let c = midCol + 2; c > midCol - 3; c--) {
        boardCopy[r][c] = BOX_KEY.GROUND;
      }
    }
  } else if(start === 1){ // first room is in the bottom left corner
    for (let r = rows - 6; r < rows-1; r++){
      for (let c = 1; c < 7; c++){
        boardCopy[r][c] = BOX_KEY.GROUND;
      }
    }
  } else if (start === 2) { // first room is in the bottom right corner
    for (let r = rows - 6; r < rows - 1; r++) {
      for (let c = cols - 6; c < cols - 1; c++) {
        boardCopy[r][c] = BOX_KEY.GROUND;
      }
    }
  } else if (start === 3) { // first room is in the top left corner
    for (let r = 1; r < 7; r++) {
      for (let c = 1; c < 7; c++) {
        boardCopy[r][c] = BOX_KEY.GROUND;
      }
    }
  } else if (start === 4) { // first room is in the top right corner
    for (let r = 1; r < 7; r++) {
      for (let c = cols - 6; c < cols - 1; c++) {
        boardCopy[r][c] = BOX_KEY.GROUND;
      }
    }
  }
  return boardCopy;
}

export function findWall(board, rows, cols) {
  // searches the board for a random floor tile and checks if
  // returns the location of the door, and which direction to go
  // arr, ints, bool -> obj (ints, str)
  while(true){
    var randomRow = _.random(rows-1);
    var randomCol = _.random(cols-1);
    var wallRow;
    var wallCol;
    var direction;
    if (board[randomRow][randomCol] === BOX_KEY.GROUND){
      try {
          if (board[randomRow + 1][randomCol] === BOX_KEY.WALL) {
          wallRow = randomRow + 1;
          wallCol = randomCol;
          direction = 'down';
          break;
      }
    }
    catch(err){
    }
      try {
          if (board[randomRow - 1][randomCol] === BOX_KEY.WALL) {
          wallRow = randomRow - 1;
          wallCol = randomCol;
          direction = 'up';
          break;
        }
      }
      catch(err){
      }
      try {
          if (board[randomRow][randomCol + 1] === BOX_KEY.WALL) {
          wallRow = randomRow;
          wallCol = randomCol + 1;
          direction = 'right';
          break;
        }
      }
      catch(err){
      }
      try {
          if (board[randomRow][randomCol - 1] === BOX_KEY.WALL) {
          wallRow = randomRow;
          wallCol = randomCol - 1;
          direction = 'left';
          break;
        }
      }
      catch(err){
      }
    }
  }
  return {wallRow, wallCol, direction };
}

export function createDoor(board, wallCoords){
  // creates a door in the designated area
  // arr, ints -> arr
  let boardCopy = _.cloneDeep(board);
  const { wallRow, wallCol} = wallCoords;
  boardCopy[wallRow][wallCol] = BOX_KEY.GROUND;
  return boardCopy;
}

export function newRoom(){
  // gets the dimensions for a new room to build
  // -- -> ints
  const rows = _.random(3, 8);
  const cols = _.random(3, 8);
  return {rows, cols};
}

export function checkSpace(board, wallCoords){
  // checks if the space is valid to build a room
  // if hits a wall during the check, it is not valid
  // allowing for rooms inside already built rooms for interesting shapes
  // builds the room if valid, retuns old board if not
  // arr, ints, str -> arr
  let boardCopy = _.cloneDeep(board);
  let cancel = false; // to stop search if invalid
  const {wallRow, wallCol, direction} = wallCoords;
  const {rows, cols} = newRoom(); // get dimensions for new room

  switch(direction){
    case 'down':
      for(let r = 0; r < rows+1; r++){
        for (let c = 0; c < cols+1; c++){
          try {
            if(boardCopy[1 + wallRow + r][wallCol + c] !== BOX_KEY.WALL) {
              cancel = true;
              break;
            }
         }
         catch(err){
           cancel = true;
           break;
         }
          boardCopy[1 + wallRow + r][wallCol + c] = BOX_KEY.GROUND;
        }
      }
      break;
    case 'up':
      for (let r = 0; r < rows + 1; r++) {
        for (let c = 0; c < cols + 1; c++) {
          try {
            if (boardCopy[wallRow - r - 1][wallCol + c] !== BOX_KEY.WALL) {
              cancel = true;
              break;
            }
          }
          catch(err){
            cancel = true
            break
          }
          boardCopy[wallRow - r - 1][wallCol + c] = BOX_KEY.GROUND;
        }
      }
      break;
    case 'right':
      for (let r = 0; r < rows + 1; r++) {
        for (let c = 0; c < cols + 1; c++) {
          try {
            if (boardCopy[wallRow + r][1 + wallCol + c] !== BOX_KEY.WALL) {
              cancel = true;
              break;
            }
          }
          catch(err){
            cancel = true
            break
          }
          boardCopy[wallRow + r][1 + wallCol + c] = BOX_KEY.GROUND;
        }
      }
      break;
    case 'left':
      for (let r = 0; r < rows + 1; r++) {
        for (let c = 0; c < cols + 1; c++) {
          try {
            if (boardCopy[wallRow + r][wallCol - c - 1] !== BOX_KEY.WALL) {
              cancel = true;
              break;
            }
          }
          catch(err){
            cancel = true
            break
          }
          boardCopy[wallRow + r][wallCol - c - 1] = BOX_KEY.GROUND;
        }
      }
  }
  if (cancel){
    // return old board if invalid
    return board;
  }
  // call to create the doorway if the room is valid
  boardCopy = createDoor(boardCopy, wallCoords);
  return boardCopy;
}
