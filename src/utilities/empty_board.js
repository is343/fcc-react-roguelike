import _ from 'lodash';

export default function createDungeonLevel(rows, cols){
  var board = emptyBoard(rows, cols);
  board = outerWall(board, rows, cols);
  board = firstRoom(board, rows, cols);
  var wallCoords = findWall(board, rows, cols, true); // first room
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
    .map(() => Array(cols).fill(0));
  return blankBoard;
};

export function outerWall(board, rows, cols){
  // creates the outer walls (9 == outer wall class)
  // sets the perimeter of the grid to 9
  // arr, ints -> arr
  let newBoard = _.cloneDeep(board);
  for (let c = 0; c < cols; c++) {
    newBoard[0][c] = 9;
    newBoard[rows - 1][c] = 9;
  }
  for (let r = 0; r < rows; r++) {
    newBoard[r][0] = 9;
    newBoard[r][cols-1] = 9;
  }
  return newBoard;
}



export function firstRoom(board, rows, cols) {
  // creates a 5x5 room in the center of the m
  // arr, ints -> arr
  let boardCopy = _.cloneDeep(board);
  const midRow = Math.floor(rows / 2);
  const midCol = Math.floor(cols / 2);
  for(let r = midRow + 2; r > midRow -3; r--){
    for (let c = midCol + 2; c > midCol - 3; c--) {
      boardCopy[r][c] = 1;
    }
  }
  return boardCopy;
}

export function findWall(board, rows, cols, first = false, tries = 1000) {
  // searches the board for a random floor tile and checks if
  // is next to a wall (0 == wall, 1 == floor)
  // tries == how many times it will search
  // first == if it is the first room, so it will not stop searching
  // returns the location of the door, and which direction to go
  // arr, ints, bool -> obj (ints, str)
  while(tries >0){
    var randomRow = _.random(0, rows-1);
    var randomCol = _.random(0, cols-1);
    var wallRow;
    var wallCol;
    var direction;
    // 0 = wall, 1 = floor
    if (board[randomRow][randomCol] === 1){
      try {
          if (board[randomRow + 1][randomCol] === 0) {
          wallRow = randomRow + 1;
          wallCol = randomCol;
          direction = 'down';
          break;
      }
    }
    catch(err){
    }
      try {
          if (board[randomRow - 1][randomCol] === 0) {
          wallRow = randomRow - 1;
          wallCol = randomCol;
          direction = 'up';          break;
        }
      }
      catch(err){
      }
      try {
          if (board[randomRow][randomCol + 1] === 0) {
          wallRow = randomRow;
          wallCol = randomCol + 1;
          direction = 'right';
          break;
        }
      }
      catch(err){
      }
      try {
          if (board[randomRow][randomCol - 1] === 0) {
          wallRow = randomRow;
          wallCol = randomCol - 1;
          direction = 'left';
          break;
        }
      }
      catch(err){
      }
    }
    tries--;
    if (first === true) {
      tries = 1000;
    }
  }
  return {wallRow, wallCol, direction };
}

export function createDoor(board, wallCoords){
  // creates a door in the designated area
  // arr, ints -> arr
  let boardCopy = _.cloneDeep(board);
  const { wallRow, wallCol} = wallCoords;
  boardCopy[wallRow][wallCol] = 1;
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
            if(boardCopy[1 + wallRow + r][wallCol + c] !== 0) {
              cancel = true;
              break;
            }
         }
         catch(err){
           cancel = true;
           break;
         }
          boardCopy[1 + wallRow + r][wallCol + c] = 1;
        }
      }
      break;
    case 'up':
      for (let r = 0; r < rows + 1; r++) {
        for (let c = 0; c < cols + 1; c++) {
          try {
            if (boardCopy[wallRow - r - 1][wallCol + c] !== 0) {
              cancel = true;
              break;
            }
          }
          catch(err){
            cancel = true
            break
          }
          boardCopy[wallRow - r - 1][wallCol + c] = 1;
        }
      }
      break;
    case 'right':
      for (let r = 0; r < rows + 1; r++) {
        for (let c = 0; c < cols + 1; c++) {
          try {
            if (boardCopy[wallRow + r][1 + wallCol + c] !== 0) {
              cancel = true;
              break;
            }
          }
          catch(err){
            cancel = true
            break
          }
          boardCopy[wallRow + r][1 + wallCol + c] = 1;
        }
      }
      break;
    case 'left':
      for (let r = 0; r < rows + 1; r++) {
        for (let c = 0; c < cols + 1; c++) {
          try {
            if (boardCopy[wallRow + r][wallCol - c - 1] !== 0) {
              cancel = true;
              break;
            }
          }
          catch(err){
            cancel = true
            break
          }
          boardCopy[wallRow + r][wallCol - c - 1] = 1;
        }
      }
  }
  if (cancel === true){
    // return old board if invalid
    return board;
  }
  // call to create the doorway if the room is valid
  boardCopy = createDoor(boardCopy, wallCoords);
  return boardCopy;
}
