import _ from 'lodash';

export default function emptyBoard(rows, cols) {
  // creates a board array with all blank (false) boxes
  // updates state with a new blank board
  // ints -> array
  let blankBoard = Array(rows)
    .fill()
    .map(() => Array(cols).fill(0));
  ///////////////
  let roomedBoard = firstRoom(blankBoard, rows, cols);
  let wallCoords = findWall(roomedBoard, rows, cols, true);
  let newBlankBoard = markWall(blankBoard, wallCoords);

  ///////////////
  return roomedBoard;
};



function firstRoom(board, rows, cols) {
  // creates a 5x5 room in the center of the m
  // arr, ints -> arr
  const midRow = Math.floor(rows / 2);
  const midCol = Math.floor(cols / 2);
  for(let r = midRow + 2; r > midRow -3; r--){
    for (let c = midCol + 2; c > midCol - 3; c--) {
      board[r][c] = 1;
    }
  }
  return board;
}

function findWall(board, rows, cols, tries=100) {
  while(tries >0 || tries !== true){
    var randomRow = _.random(0, rows-1);
    var randomCol = _.random(0, cols-1);
    var wallRow = 0;
    var wallCol = 0;
    // 0 = wall, 1 = floor
    if (board[randomRow][randomCol] === 1){
      if (board[randomRow+1][randomCol] === 0) {
        wallRow = randomRow+1;
        wallCol = randomCol;
        tries = 0;
        break;
    }
      if (board[randomRow - 1][randomCol] === 0) {
        wallRow = randomRow - 1;
        wallCol = randomCol;
        tries = 0
        break;
      }
      if (board[randomRow][randomCol + 1] === 0) {
        wallRow = randomRow;
        wallCol = randomCol + 1;
        tries = 0
        break;
      }
      if (board[randomRow][randomCol - 1] === 0) {
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
  board[row][col] = 1;
  return board;
}