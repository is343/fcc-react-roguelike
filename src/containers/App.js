import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import '../style/App.css';
import PlayField from '../containers/play_board';
import Buttons from '../containers/buttons';
import { handleMovement } from '../actions';

class App extends Component {
  onKeyPress = (e) => {
    e.preventDefault();
    // valid keypresses
    if ([37,38,39,40].includes(e.keyCode)){
      this.props.onMovement(
        this.props.dungeonFloors, 
        this.props.currentLevel, 
        e.keyCode, 
        this.props.playerLocations,
        this.props.stats
      );
    }
  };
  componentDidMount(){
    window.addEventListener('keydown', this.onKeyPress);
  }
  componentWillMount() {
    window.removeEventListener('keydown', this.onKeyPress);
  }

  render() {
    let render;
    if(this.props.win){
      render = (
        <div className='center'>
          <h1 className='center'>
            YOU DEFEATED THE BOSS! YOU WIN!
          </h1>
          <h2 className='center'>
            Refresh to play again.
          </h2>
        </div>
      );
    } else if(this.props.lose){
      render = (
        <div className='center'>
          <h1 className='center'>
            YOU DIED!
          </h1>
          <h2 className='center'>
            Refresh to retry.
          </h2>
        </div>
      );
    } else {
      render = (
        <div>
          <Buttons />
          <PlayField />
        </div>
      );
    }

    return (
      <div>        
        {render}
      </div>
    );
  }
}

function mapStoreToProps(store) {
  return {
    currentLevel: store.playBoard.currentLevel,
    dungeonFloors: store.playBoard.dungeonFloors,
    playerLocations: store.playBoard.playerLocations,
    stats: store.playBoard.stats,
    win: store.playBoard.stats.playerStats.win,
    lose: store.playBoard.stats.playerStats.lose
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onMovement: handleMovement
  }, dispatch);
}

export default connect(mapStoreToProps, mapDispatchToProps)(App);

