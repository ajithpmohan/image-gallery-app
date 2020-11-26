import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { doSetCategories, doSetImages } from 'actions';

const ServerCtxProvider = ({ children }) => {
  /*
    ServerCtxProvider fetches categories & images from server &
    store it into redux store.
  */
  const dispatch = useDispatch();
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_DOMAIN;

  useEffect(() => {
    (async () => {
      let res = await axios
        .get(`${SERVER_BASE_URL}image-category/`)
        .catch(({ response }) => response);

      res.status === 200 && dispatch(doSetCategories(res.data));

      res = await axios
        .get(`${SERVER_BASE_URL}image-gallery/`)
        .catch(({ response }) => response);

      res.status === 200 && dispatch(doSetImages(res.data));
    })();
  }, []);

  return <>{children}</>;
};

ServerCtxProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ServerCtxProvider;
