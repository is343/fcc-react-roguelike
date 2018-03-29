import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './containers/App';


import reducers from './reducers';
import middleware from './middleware';



const createStoreWithMiddleware = middleware(createStore)(reducers);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware}>
    <App />
  </Provider>
  , document.getElementById('root'));
