import React from 'react';
import PropTypes from 'prop-types';
import { Grid, NavBarContainer } from './index';

const FrontPage = props => (
  <Grid
    padded
    centered
    style={{ height: '100vh', display: 'flex', alignItems: 'center' }}
  >
    {props.children}
  </Grid>
);

const PageWithMenu = props => (
  <NavBarContainer>
    <Grid padded centered>
      <Grid.Row>
        {props.children}
      </Grid.Row>
    </Grid>
  </NavBarContainer>
);

const Page = ({component: Component, route, frontPage, ...rest}) => {
  console.log(Component);
  return frontPage ? (
    <FrontPage>
      <Component route={route} {...rest} />
    </FrontPage>
  ) : (
    <PageWithMenu>
      <Component route={route} {...rest} />
    </PageWithMenu>
  );
};

Page.defaultProps = {
  frontPage: false
};

Page.propTypes = {
  // Aqui component é uma func, pois Page recebe a referência para instanciar o componente...
  component: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired,
  frontPage: PropTypes.bool.isRequired
};

export default Page;