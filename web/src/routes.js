import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Page } from 'components/layout';
import { CustomerHome, CustomerRating, CustomerAppointment, CustomerAppointmentRegister, CustomerFavWorker } from 'components/pages/customer';
import { ServiceList, ServiceRegister, CustomerList, Billing, Profile } from 'components/pages/worker';
import Home from 'components/pages/Home';
import Page404 from 'components/pages/Page404';
import Login from 'components/pages/Login';
import Register from 'components/pages/Register';
import ForgotPassword from 'components/pages/ForgotPassword';
import ResetPassword from 'components/pages/ResetPassword';

export const Routes = () => (
  <Switch>
    <Route
      path="/"
      exact
      render={route => {
        return <Page component={Home} route={route} />;
      }}
    />
    <Route
      path="/customer/home"
      exact
      render={route => {
        return <Page component={CustomerHome} route={route} />;
      }}
    />
    <Route
      path="/customer/rating"
      exact
      render={route => {
        return <Page component={CustomerRating} route={route} />;
      }}
    />
    <Route
      path="/meus-agendamentos"
      exact
      render={route => {
        return <Page component={CustomerAppointment} route={route} />;
      }}
    />
    <Route
      path="/novo-agendamento"
      exact
      render={route => {
        return <Page component={CustomerAppointmentRegister} route={route} />;
      }}
    />
    <Route
      path="/favoritos"
      render={route => {
        return <Page component={CustomerFavWorker} route={route} />;
      }}
    />
    <Route
      path="/meus-servicos"
      exact
      render={route => {
        return <Page component={ServiceList} route={route} />;
      }}
    />
    <Route
      path="/meus-servicos/novo"
      exact
      render={route => {
        return <Page component={ServiceRegister} route={route} />;
      }}
    />
    <Route
      path="/customers-list"
      exact
      render={route => {
        return <Page component={CustomerList} route={route} />;
      }}
    />
    <Route
      path="/profile"
      exact
      render={route => {
        return <Page component={Profile} route={route} />
      }}
    />
    <Route
      path="/billing"
      exact
      render={route => {
        return <Page component={Billing} route={route}/>
      }}
    />
    <Route
      path="/login"
      exact
      render={route => {
        return <Page frontPage component={Login} route={route} />;
      }}
    />
    <Route
      path="/signup"
      exact
      render={route => {
        return <Page frontPage component={Register} route={route}/>
      }}
    />
    <Route
      path="/forgot-password"
      exact
      render={route => {
        return <Page frontPage component={ForgotPassword} route={route} />;
      }}
    />
    <Route
      path="/forgot-password/reset/:key"
      exact
      render={route => {
        return <Page frontPage component={ResetPassword} route={route} />;
      }}
    />
    <Route
      path="*"
      render={route => {
        return <Page component={Page404} route={route} />;
      }}
    />
  </Switch>
);
