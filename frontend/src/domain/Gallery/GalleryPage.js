import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Container from 'react-bootstrap/Container';

// import { doFetchCategories, doFetchImages } from 'actions';
import { CategorySelect } from 'components/Category';
import { doSetCategories, doSetImages } from 'actions';
import { getImages, getCategories } from 'selectors';
import GalleryList from './GalleryList';

const GalleryPage = () => {
  const categories = useSelector((state) => getCategories(state));
  const images = useSelector((state) => getImages(state));
  const [filter, setFilter] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(doFetchCategories(`image-category/`));
    // dispatch(doFetchImages(`image-gallery/`));
    (async () => {
      const SERVER_BASE_URL = process.env.REACT_APP_SERVER_DOMAIN;
      const res = await axios.get(
        `${SERVER_BASE_URL}image-category/`,
      );
      dispatch(doSetCategories(res.data));
      const resp = await axios.get(
        `${SERVER_BASE_URL}image-gallery/`,
      );
      dispatch(doSetImages(resp.data));
    })();
  }, []);

  const handleChange = (e) => {
    setFilter(parseInt(e.target.value || 0));
  };

  return (
    <Container>
      <CategorySelect
        categories={categories}
        label="Filter by Category &nbsp;"
        handleChange={handleChange}
      />
      <hr />
      <GalleryList images={images} filter={filter} />
    </Container>
  );
};

export default GalleryPage;
