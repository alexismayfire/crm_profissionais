import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'semantic-ui-react';

const NavItem = props => {
  /*
    Por padrão, props.dropdown é false, mas quando chamado diretamente,
    ou seja, instanciando esse componente como <MenuItem dropdown>...</MenuItem>,
    vai ser renderizado como um item de um dropdown superior (ver uso em UserMenu)
   */
  const Component = props.dropdown ? Dropdown.Item : Menu.Item;
  return (
    <Component
      name={props.name}
      active={props.route === props.activeRoute}
      onClick={props.handler}
      as={Link}
      to={props.route}
    >
      {props.children}
    </Component>
  );
};

// Se não instanciar com <MenuItem dropdown>, isso garante que o valor será false.
// Com isso, o React não vai logar erro ao checar os PropTypes!
NavItem.defaultProps = {
  dropdown: false
};

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  activeRoute: PropTypes.string.isRequired,
  dropdown: PropTypes.bool
};

export default NavItem;