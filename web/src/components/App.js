import React from 'react';
import { Router } from 'react-router-dom';

import { Grid } from 'semantic-ui-react';

import { Routes } from './../routes';
import MenuNavBar from '../components/menu/Menu';

import history from '../history';

const App = () => {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
};

export default App;