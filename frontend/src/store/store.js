import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import {
  createStateSyncMiddleware,
  initMessageListener,
} from 'redux-state-sync';

import rootReducer from 'reducers';

/* Redux Logger */
const logger = createLogger();

/* Redux State Sync - Useful for crosstab state sync */
const stateSyncConfig = {};
const stateSyncMiddlewares = [
  createStateSyncMiddleware(stateSyncConfig),
];

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(...stateSyncMiddlewares, logger),
);

initMessageListener(store);

export default store;
