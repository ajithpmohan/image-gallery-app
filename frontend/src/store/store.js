import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import {
  createStateSyncMiddleware,
  initMessageListener,
} from 'redux-state-sync';

import rootReducer from 'reducers';
import rootSaga from 'sagas';

const saga = createSagaMiddleware();

const logger = createLogger();

const stateSyncConfig = {};
const stateSyncMiddlewares = [
  createStateSyncMiddleware(stateSyncConfig),
];

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(...stateSyncMiddlewares, logger, saga),
);

saga.run(rootSaga);

initMessageListener(store);

export default store;
