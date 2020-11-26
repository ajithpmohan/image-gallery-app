import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { store } from 'store';

const ReduxStoreProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

ReduxStoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ReduxStoreProvider;
