import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import LoginForm from './LoginForm';
import Home from './Home';
import Page404 from './404';
import MenuNavBar from './components/menu/Menu';
import { WorkerHomePage, ServiceForm } from './components/worker';
import { CustomerHomePage, RatingForm } from './components/customer';
import RegisterForm from './RegisterForm';

export const Layout = props => {
    const { component: Component, route, ...rest } = props;
    return (
        <Grid.Row>
          <Component route={route} {...rest} />
        </Grid.Row>
    );
};

export const Routes = () => {
    const layoutRender = component => route => (
        <MenuNavBar>
            <Grid padded centered>
                <Layout component={component} route={route} />
            </Grid>
        </MenuNavBar>
    );
    const layoutRenderWithProps = (component, props) => route => (
        <MenuNavBar>
            <Grid padded centered>
                <Layout component={component} route={route} {...props} />
            </Grid>
        </MenuNavBar>
    );
    return (
        <Switch>
            <Route 
                path="/login"
                exact 
                render={layoutRender(LoginForm)} 
            />
            <Route 
                path="/signup" 
                exact 
                render={layoutRenderWithProps(RegisterForm, {customer: true})}
            />
            <Route 
                path="/worker/home" 
                exact 
                render={layoutRender(WorkerHomePage)} 
            />
            <Route 
                path="/worker/service" 
                exact 
                render={layoutRender(ServiceForm)} 
            />
            <Route 
                path="/customer/home" 
                exact 
                render={layoutRender(CustomerHomePage)} 
            />
            <Route 
                path="/customer/rating" //aqui teria algum id do atendimento, sei lá... 
                exact 
                render={layoutRender(RatingForm)} 
            />
            <Route 
                path="/" //essa ñ existe na real, seria redirecionado para customer ou worker
                exact 
                render={layoutRender(Home)}
            />
            <Route 
                path="*" 
                render={layoutRender(Page404)}
            />
        </Switch>
    );
};