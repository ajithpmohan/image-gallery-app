import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';

const GalleryItem = ({ image }) => (
  <Card
    bg="light"
    className="text-center p-3"
    key={image.id}
    border="dark"
  >
    <Card.Img variant="top" src={image.image} />
    <Card.Body>
      <Card.Title>{image.image_category?.name}</Card.Title>
    </Card.Body>
  </Card>
);

GalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.string,
    image: PropTypes.string,
    image_category: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default GalleryItem;
