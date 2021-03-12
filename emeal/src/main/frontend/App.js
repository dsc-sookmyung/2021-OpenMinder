import React from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/_modules/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';


import Root from './src/main/Root';


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
  );
console.log(store.getState());

const App = () => {

  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};


export default App;
