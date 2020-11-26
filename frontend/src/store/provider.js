import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { store } from 'store';

const StoreCtxProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

StoreCtxProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default StoreCtxProvider;
