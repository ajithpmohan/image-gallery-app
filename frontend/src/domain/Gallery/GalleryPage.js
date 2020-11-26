import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';

import { CategorySelect } from 'components/Category';
import { getImages, getCategories } from 'selectors';
import GalleryList from './GalleryList';

const GalleryPage = () => {
  const categories = useSelector((state) => getCategories(state));
  const images = useSelector((state) => getImages(state));
  const [filter, setFilter] = useState(0);

  const handleFilter = (e) => {
    setFilter(parseInt(e.target.value || 0));
  };

  return (
    <Container>
      <CategorySelect
        categories={categories}
        label="Filter by Category &nbsp;"
        handleChange={handleFilter}
      />
      <hr />
      <GalleryList images={images} filter={filter} />
    </Container>
  );
};

export default GalleryPage;
