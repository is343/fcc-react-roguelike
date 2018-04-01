import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { cycleLevel, toggleDarkness } from '../actions';

class Buttons extends Component {
  render(){
    return (
      <div className='center'>
        <div>
          Current Level: {this.props.currentLevel} of 5
          <br/>
          Player Coordinates: {this.props.playerLocations[this.props.currentLevel - 1][0]}, {this.props.playerLocations[this.props.currentLevel - 1][1]}
          <br/>
          Health: {this.props.health} | Player Level: {this.props.level} | Weapon Level: {this.props.weapon} | XP: {this.props.xp}
          <br/>
          Weapons Remaining: {this.props.weaponsRemaining[this.props.currentLevel - 1]} | Health Packs Remaining: {this.props.healthPacksRemaining[this.props.currentLevel - 1]} | Enemies Remaining: {this.props.enemiesRemaining[this.props.currentLevel - 1]}
        </div>
        <div>
          Our Hero: <div className={`box player`} /> | 
          Weapon: <div className={`box weapon`} /> |
          Health Pack: <div className={`box health`} /> |
          Pit Down: <div className={`box hole`} /> |
          Enemy: <div className={`box enemy`} /> |
          Boss: <div className={`box boss`} />
        </div>
        <button
          onClick={() => this.props.toggleDarkness(this.props.darkness)}
        >
          Toggle Darkness
        </button>
      </div>
      
    )
  }
}

function mapStoreToProps(store){
  return{
    currentLevel: store.playBoard.currentLevel,
    dungeonFloors: store.playBoard.dungeonFloors,
    playerLocations: store.playBoard.playerLocations,
    darkness: store.playBoard.darkness,
    health: store.playBoard.stats.playerStats.health,
    level: store.playBoard.stats.playerStats.level,
    weapon: store.playBoard.stats.playerStats.weapon,
    xp: store.playBoard.stats.playerStats.xp,
    weaponsRemaining: store.playBoard.stats.itemStats.weapons,
    healthPacksRemaining: store.playBoard.stats.itemStats.health,
    enemiesRemaining: store.playBoard.stats.itemStats.enemies,
    enemies: store.playBoard.stats.enemyStats.enemies,
  };
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({
    toggleDarkness: toggleDarkness
  }, dispatch);
}


export default connect(mapStoreToProps, mapDispatchToProps)(Buttons);