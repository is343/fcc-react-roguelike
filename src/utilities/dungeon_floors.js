import createDungeonLevel from '../utilities/create_dungeon';
import populateDungeon from '../utilities/populate_dungeon';

export default function createDungeonLevels(rows, cols){
  // creates multiple levels of the dungeon
  // calls and creates objects and player locations for each floor
  // ints -> object (of arrays)
  let dungeonFloors = [];
  let playerLocations = [];
  let weapons = [];
  let health = [];
  let numEnemies = [];
  let enemies = [];
  for(let i = 1; i < 6; i++){
    let tempLevel = createDungeonLevel(rows, cols);
    let tempLevelAndPlayerLocsAndStats = populateDungeon(tempLevel, rows, cols, i);
    dungeonFloors.push(tempLevelAndPlayerLocsAndStats.board);
    playerLocations.push(tempLevelAndPlayerLocsAndStats.playerLocations);
    weapons.push(tempLevelAndPlayerLocsAndStats.stats.itemStats.weapons);
    health.push(tempLevelAndPlayerLocsAndStats.stats.itemStats.health);
    numEnemies.push(tempLevelAndPlayerLocsAndStats.stats.itemStats.enemies);
    enemies.push(tempLevelAndPlayerLocsAndStats.stats.enemyStats.enemies);
  }
  return {
    dungeonFloors: dungeonFloors,
    playerLocations: playerLocations,
    stats: {
      playerStats: { health: 100, level: 1, weapon: 0, xp: 0, win: false, lose: false },
      itemStats: {weapons: weapons, health: health, enemies: numEnemies },
      enemyStats: {enemies: enemies, bossHealth: 300}
    }
  };
}