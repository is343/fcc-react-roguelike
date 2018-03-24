import _ from 'lodash';

export default function emptyBoard(rows, cols) {
  // creates a board array with all blank (false) boxes
  // updates state with a new blank board
  // ints -> array
  let blankBoard = Array(rows)
    .fill()
    .map(() => Array(cols).fill(true));
  ///////////////
  blankBoard = firstRoom(blankBoard, rows, cols);
  let wallCoords = findWall(blankBoard, rows, cols, true);
  let newBlankBoard = markWall(blankBoard, wallCoords);

  ///////////////
  return newBlankBoard;
};

var roomLocations= [];

function updateLocation(rowLocs, colLocs){
  let newRoomLocations = roomLocations.slice(0);
  newRoomLocations.push([rowLocs, colLocs]);
  return newRoomLocations;
}


function firstRoom(board, rows, cols) {
  // creates a 5x5 room in the center of the m
  // arr, ints -> arr
  const midRow = Math.floor(rows / 2);
  const midCol = Math.floor(cols / 2);
  for(let r = midRow + 2; r > midRow -3; r--){
    for (let c = midCol + 2; c > midCol - 3; c--) {
      board[r][c] = false;
    }
  }
  const rowLocs = {start: midRow-3, end: midRow+2};
  const colLocs = {start: midCol-3, end: midCol+2};
  updateLocation(rowLocs, colLocs);
  return board;
}

function findWall(board, rows, cols, tries=100) {
  while(tries >0 || tries !== true){
    let randomRow = _.random(0, rows);
    let randomCol = _.random(0, cols);
    let wallRow;
    let wallCol;
    if (board[randomRow][randomCol] === false){
      if (board[randomRow+1][randomCol] === true) {
        wallRow = randomRow+1;
        wallCol = randomCol;
        tries = 0;
        break;
    }
      if (board[randomRow - 1][randomCol] === true) {
        wallRow = randomRow - 1;
        wallCol = randomCol;
        tries = 0
        break;
      }
      if (board[randomRow][randomCol + 1] === true) {
        wallRow = randomRow;
        wallCol = randomCol + 1;
        tries = 0
        break;
      }
      if (board[randomRow][randomCol - 1] === true) {
        wallRow = randomRow;
        wallCol = randomCol - 1;
        tries = 0
        break;
      }
    }
    tries--;
  }
  return [wallRow, wallCol];
}

function markWall(board, wallCoords){
  const[row,col] = wallCoords;
  board[row][col] = false;
  return board;
}