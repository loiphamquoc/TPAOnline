/*
 * Created by Jeremy on Fri Jun 15 2018
 *
 * Copyright (c) 2018 Jeremy
 */
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../reducers/reducers'
import { createEpicMiddleware } from 'redux-observable';
import { middleware } from '../components/AppNavigator';

import epic from '../actions/epic';

/**
 *  Redux Store configuration
 */

const middlewares = [
  createEpicMiddleware(epic)
];

//create store
var store = createStore(reducers, {},
  compose(
    applyMiddleware(...middlewares, middleware)
  )
);

export default store;