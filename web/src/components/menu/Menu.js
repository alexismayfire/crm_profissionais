import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

import MenuItem from "./MenuItem";

const MenuNavBar = props => (
  <Menu pointing secondary>
    {props.items.map((item, x) => (
      <MenuItem key={x} activeRoute={props.activeRoute} {...item} />
    ))}
    {props.children}
  </Menu>
);

MenuNavBar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
      handler: PropTypes.func.isRequired
    })
  ).isRequired,
  activeRoute: PropTypes.string.isRequired
};

export default MenuNavBar;
