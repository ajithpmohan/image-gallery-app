import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import * as ROUTES from 'constants/routes';
import GalleryItem from './GalleryItem';

const GalleryList = ({ images = [], filter }) => {
  return !!images.length ? (
    <CardColumns>
      {images
        .filter((image) => !filter || image.category === filter)
        .map((image) => (
          <GalleryItem image={image} key={image.id} />
        ))}
    </CardColumns>
  ) : (
    <Card body>
      Gallery is empty.
      <Nav.Link as={Link} to={ROUTES.UPLOAD}>
        Upload some images
      </Nav.Link>
    </Card>
  );
};

GalleryList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired),
  filter: PropTypes.number.isRequired,
};

export default GalleryList;
