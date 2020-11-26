import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
// import { doFetchCategories, doFetchImages } from 'actions';
import { doSetCategories, doSetImages } from 'actions';
import { getImages, getCategories } from 'selectors';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import GalleryList from './GalleryList';
import Card from 'react-bootstrap/Card';

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
    <>
      {!!categories.length && (
        <>
          <Form inline>
            Filter by Category &nbsp;
            <FormControl as="select" onChange={handleChange}>
              <option value="">---</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </FormControl>
          </Form>
          <hr />
        </>
      )}

      {images.length ? (
        <GalleryList images={images} filter={filter} />
      ) : (
        <Card body>Gallery is empty.</Card>
      )}
    </>
  );
};

export default GalleryPage;
