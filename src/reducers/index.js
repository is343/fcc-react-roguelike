import { combineReducers } from 'redux';
import playBoardReducer from './play_board';

const rootReducer = combineReducers({
  playBoard: playBoardReducer
});

export default rootReducer;



