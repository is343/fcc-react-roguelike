import _ from 'lodash';
import { BOX_KEY } from '../actions';

// KEY = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
const DIRECTION = { 
  37: {ROW: 0, COL: -1}, 
  38: {ROW: -1, COL: 0}, 
  39: {ROW: 0, COL: 1}, 
  40: {ROW: 1, COL: 0}
};

// stats: {
//   playerStats: { health: 100, level: 1, weapon: 0, xp: 0, win: false, lose: false  },
//   itemStats: { weapons: [], health: [] },
//   enemyStats: { enemies: [[{ loc: [], health: 10 }]], bossHealth: 200 }
// }


export default function playerMovement(boards, currentLevel, keyCode, playerLocations, stats){
  // moves the player to a new square based on the key pressed
  // does nothing if moves into a wall
  // arrs, int -> object (of arrs)
  let level = currentLevel - 1;
  let win = false;
  let lose = false;
  let updatedBoard = boards;
  let updatedLocations = playerLocations;
  let newPlayerLoc = getNewLocation(keyCode, playerLocations, level);
  if (validMoveCheck(boards, newPlayerLoc, level)){
    let updatedStatsAndLevel = whichAction(boards, newPlayerLoc, level, stats, currentLevel);
    let updatedStats = updatedStatsAndLevel.stats;
    let updatedLevel = updatedStatsAndLevel.currentLevel;
    let {canMove} = updatedStatsAndLevel;
    if(canMove){
      updatedBoard = colorBoxes(boards, newPlayerLoc, playerLocations, level);
      updatedLocations = updateNewLocation(newPlayerLoc, playerLocations, level);
      if(updatedStats.playerStats.health < 0){
        lose = true;
      }
      if (updatedStats.enemyStats.bossHealth < 0) {
        win = true;
      }
      
    }
    return {
      updatedLevel: updatedLevel,
      updatedBoard: updatedBoard,
      updatedLocations: updatedLocations,
      updatedStats: updatedStats,
      win: win,
      lose: lose
    };
  }
  return {
    updatedLevel: currentLevel,
    updatedBoard: updatedBoard,
    updatedLocations: updatedLocations,
    updatedStats: stats,
    win: win,
    lose: lose
  }
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

function validMoveCheck(boards, newPlayerLoc, level){
  // checks if the new location is a wall
  // returns true if not a wall
  // arrs, int -> bool
  if (boards[level][newPlayerLoc[0]][newPlayerLoc[1]] === BOX_KEY.WALL || 
    boards[level][newPlayerLoc[0]][newPlayerLoc[1]] === BOX_KEY.OUTER ){
      return false
    }
    return true
  }


function whichAction(boards, newPlayerLoc, level, stats, currentLevel){
  // determines which action run based on which square is being moved into
  // if an enemy still has health, the player cannot move into the next square
  // obj, arr, int, obj, int -> obj (obj, int, bool)
  let test = boards[level][newPlayerLoc[0]][newPlayerLoc[1]];
  let itemStatsCopy = _.cloneDeep(stats.itemStats);
  let playerStatsCopy = _.cloneDeep(stats.playerStats);
  let enemyStatsCopy = _.cloneDeep(stats.enemyStats);
  let playerDamage = calculatePlayerDamage(playerStatsCopy);
  let enemyDamage;
  let canMove = true;
  switch (test) {
    case BOX_KEY.ENEMY:
      let enemyIndex = findIndexOfEnemy(newPlayerLoc, level, stats);
      // deal damage
      enemyStatsCopy.enemies[level][enemyIndex][0].health = enemyStatsCopy.enemies[level][enemyIndex][0].health - playerDamage;
      // if still alive, deal damage to player
      if (enemyStatsCopy.enemies[level][enemyIndex][0].health > 0) {
        enemyDamage = calculateEnemyDamage(currentLevel);
        playerStatsCopy.health = playerStatsCopy.health - enemyDamage;
        canMove = false;
      }
      // check for player death
      if (playerStatsCopy.health < 0) {
        playerStatsCopy.lose = true;
      }
      // if monster dies
      if (enemyStatsCopy.enemies[level][enemyIndex][0].health < 0) {
        itemStatsCopy.enemies[level]--;
        playerStatsCopy.xp = playerStatsCopy.xp + (100 * currentLevel);
        playerStatsCopy.level = 1 + Math.floor(playerStatsCopy.xp/1000);
      }
      stats = { ...stats, playerStats: playerStatsCopy, enemyStats: enemyStatsCopy };
      break;
    case BOX_KEY.WEAPON:
      itemStatsCopy.weapons[level]--;
      playerStatsCopy.weapon++;
      stats = { ...stats, playerStats: playerStatsCopy, itemStats: itemStatsCopy};
      break;
    case BOX_KEY.HEALTH:
      itemStatsCopy.health[level]--;
      playerStatsCopy.health = playerStatsCopy.health + 25;
      stats = { ...stats, playerStats: playerStatsCopy, itemStats: itemStatsCopy};
      break;
    case BOX_KEY.HOLE:
      currentLevel++;
      break;
    case BOX_KEY.BOSS:
      enemyStatsCopy.bossHealth = enemyStatsCopy.bossHealth - playerDamage;
      if (enemyStatsCopy.bossHealth > 0) {
        enemyDamage = calculateEnemyDamage(currentLevel + 1);
        playerStatsCopy.health = playerStatsCopy.health - enemyDamage;
        canMove = false;
      }
      if (playerStatsCopy.health < 0){
        playerStatsCopy.lose = true;
      }
      if (enemyStatsCopy.bossHealth < 0) {
        playerStatsCopy.win = true;
      }
      stats = { ...stats, playerStats: playerStatsCopy, enemyStats: enemyStatsCopy};
      break;
  }
  return { stats, currentLevel, canMove}
}

function calculatePlayerDamage(playerStats){
  // calculates damage based on player level, and weapon level
  // obj -> int
  const {level, weapon} = playerStats;
  const minDamage = (level + (weapon)) * 2;
  const maxDamage = (level + (weapon)) * 3;
  const damage = _.random(minDamage, maxDamage);
  return damage;
}

function calculateEnemyDamage(currentLevel) {
  // calculates damage based on dungeon level
  // obj -> int
  const minDamage = Math.floor(3 * currentLevel * 1.5);
  const maxDamage = Math.floor(5 * currentLevel * 1.5);
  const damage = _.random(minDamage, maxDamage);
  return damage;
}

function findIndexOfEnemy(newPlayerLoc, level, stats){
  // finds index of the current enemy
  // arr, int, obj -> int
  const enemyRow = newPlayerLoc[0];
  const enemyCol = newPlayerLoc[1];
  const foundEnemy = stats.enemyStats.enemies[level].filter( (enemy) => {
    return enemy[0].loc[0] === enemyRow && enemy[0].loc[1] === enemyCol;
  });
  const foundIndex = foundEnemy[0][0].index;
  return foundIndex;
}