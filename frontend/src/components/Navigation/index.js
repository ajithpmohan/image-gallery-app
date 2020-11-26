import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import * as ROUTES from 'constants/routes';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand as={Link} to={ROUTES.HOME}>
      Image Gallery
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={Link} to={ROUTES.UPLOAD}>
          Upload
        </Nav.Link>
        <Nav.Link as={Link} to={ROUTES.GALLERY}>
          Gallery
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;
