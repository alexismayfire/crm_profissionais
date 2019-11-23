import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Page } from 'components/layout';
import { CustomerHome } from 'components/pages/customer';
import Home from 'components/pages/Home';
import Page404 from 'components/pages/Page404';

export const Routes = () => (
  <Switch>
    <Route
      path='/'
      exact
      render={(route) => {
        return (<Page component={Home} route={route}/>);
      }}
    />
    <Route 
      path='/customer/home'
      exact
      render={(route) => {
        return (<Page component={CustomerHome} route={route}/>)
      }}
    />
    <Route
      path='*'
      render={(route) => {
        return (<Page component={Page404} route={route} />);
      }}
    />
  </Switch>
);