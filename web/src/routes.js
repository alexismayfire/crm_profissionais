import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Page } from 'components/layout';
import Home from 'components/pages/Home';
import Page404 from 'components/pages/Page404';
import Login from 'components/pages/Login';
import ForgotPassword from 'components/pages/ForgotPassword';
import ResetPassword from 'components/pages/ResetPassword';

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
      path='/login'
      exact
      render={(route) => {
        return (<Page frontPage component={Login} route={route}/>);
      }}
    />
    <Route
      path='/forgot-password'
      exact
      render={(route) => {
        return (<Page frontPage component={ForgotPassword} route={route}/>);
      }}
    />
    <Route
      path='/forgot-password/reset/:key'
      exact
      render={(route) => {
        return (<Page frontPage component={ResetPassword} route={route}/>);
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