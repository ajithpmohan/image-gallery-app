import React from 'react';
import PropTypes from 'prop-types';
import CardColumns from 'react-bootstrap/CardColumns';

import GalleryItem from './GalleryItem';

const GalleryList = ({ images, filter }) => {
  return (
    <>
      <CardColumns>
        {images
          .filter((image) => !filter || image.category === filter)
          .map((image) => (
            <GalleryItem image={image} key={image.id} />
          ))}
      </CardColumns>
    </>
  );
};

GalleryList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired),
  filter: PropTypes.number.isRequired,
};

export default GalleryList;
