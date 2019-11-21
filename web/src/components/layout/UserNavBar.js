import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon, Menu } from 'semantic-ui-react';

import { CapitalizedText } from 'components/base/text';
import NavItem from './NavItem';

const UserNavBar = props => {
  if (!props.user.token) {
    return "";
  }

  return (
    <Menu.Menu position='right'>
      <Dropdown item text={props.user.data.username}>
        <Dropdown.Menu>
          {props.items.map((item, x) => (
            <NavItem
              key={x}
              dropdown
              activeRoute={props.activeRoute}
              {...item}
            >
              <Icon name={item.icon} />
              <CapitalizedText text={item.name} />
            </NavItem>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  );
};

UserNavBar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
      handler: PropTypes.func.isRequired
    })
  ).isRequired,
  activeRoute: PropTypes.string.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
    data: PropTypes.shape({
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      customer: PropTypes.bool.isRequired
    })
  }).isRequired
};

export default UserNavBar;