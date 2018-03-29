import _ from 'lodash';
import { BOX_KEY } from '../actions';

// KEY = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
const DIRECTION = { 
  37: {ROW: 0, COL: -1}, 
  38: {ROW: -1, COL: 0}, 
  39: {ROW: 0, COL: 1}, 
  40: {ROW: 1, COL: 0}
};

export default function playerMovement(boards, currentLevel, keyCode, playerLocations){
  // moves the player to a new square based on the key pressed
  // arrs, int -> object (of arrs)
  let level = currentLevel - 1;
  let newPlayerLoc = getNewLocation(keyCode, playerLocations, level);
  let updatedBoard = colorBoxes(boards, newPlayerLoc, playerLocations, level);
  let updatedLocations = updateNewLocation(newPlayerLoc, playerLocations, level);
  return {
    updatedBoard: updatedBoard,
    updatedLocations: updatedLocations
  };
}


function getNewLocation(keyCode, playerLocations, level){
  // calculates new location of the player based on which key pressed
  // arrs, int -> arr
  let newPlayerLoc = [
    DIRECTION[keyCode].ROW + playerLocations[level][0],
    DIRECTION[keyCode].COL + playerLocations[level][1]
  ];
  return newPlayerLoc;
}

function updateNewLocation(newPlayerLoc, playerLocations, level){
  // updates the player locations with the new location
  // arrs, ints -> arr
  let locationsCopy = _.cloneDeep(playerLocations);
  locationsCopy[level] = newPlayerLoc;
  return locationsCopy
}


function colorBoxes(boards, newPlayerLoc, playerLocations, level){
  // marks new location with player, and old location as ground
  // arrs -> arr
  let boardCopy = _.cloneDeep(boards);
  boardCopy[level][playerLocations[level][0]][playerLocations[level][1]] = BOX_KEY.GROUND;
  boardCopy[level][newPlayerLoc[0]][newPlayerLoc[1]] = BOX_KEY.PLAYER;
  
  return boardCopy;
}