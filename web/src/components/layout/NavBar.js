import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

import NavItem from './NavItem';

const NavBar = props => (
  <Menu pointing secondary>
    {props.items.map((item, x) => (
      <NavItem key={x} activeRoute={props.activeRoute} {...item} />
    ))}
    {props.children}
  </Menu>
);

NavBar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
      handler: PropTypes.func.isRequired
    })
  ).isRequired,
  activeRoute: PropTypes.string.isRequired
};

export default NavBar;