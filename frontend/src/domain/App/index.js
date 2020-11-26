import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import * as ROUTES from 'constants/routes';

import Navigation from 'components/Navigation';
import HomePage from 'domain/Home';
import GalleryPage from 'domain/Gallery';
import UploadPage from 'domain/Upload';

const App = () => (
  <Container fluid>
    <Router>
      <Navigation />

      <hr />
      <Switch>
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route exact path={ROUTES.UPLOAD} component={UploadPage} />
        <Route exact path={ROUTES.GALLERY} component={GalleryPage} />
      </Switch>
    </Router>
  </Container>
);

export default App;
