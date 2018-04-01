import { applyMiddleware } from 'redux';

const logger = (store) => (next) => (action) => {
  console.log('action dispatched:', action);
  next(action);
}

const alert = (store) => (next) => (action) => {
  if (action.payload.lose){
    alert('You died!');
  }
  if (action.payload.win) {
    alert('You killed the boss!');
  }
  next(action);
}


const middleware = applyMiddleware();

export default middleware;