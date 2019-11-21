import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Como esses componentes não são exportados pelo index, faz essa importação direta
import Menu from './NavBar';
import UserMenu from './UserNavBar';

class MenuContainer extends Component {
  state = { activeRoute: '/' };

  handleItemClick = (e, { name }) => this.setState({ activeRoute: name });

  menuOptions = (name, route, handler = this.handleItemClick) => ({
    name,
    route,
    handler
  });

  submenuOptions = (name, icon, route, handler = this.handleItemClick) => ({
    ...this.menuOptions(name, route, handler),
    icon
  });

  render() {
    const activeRoute = this.props.match.url;
    const { user, children } = this.props;
    // O item obrigatoriamente precisa de um handler!
    // Isso é interessante caso precise fazer uma tratativa diferente (por exemplo, no logout)
    const workerMenuItems = [
      this.menuOptions('worker home', '/worker/home'),
      this.menuOptions('cadastro de serviços', '/worker/service')
    ];

    const customerMenuItems = [
      this.menuOptions('customer home', '/customer/home')
    ];

    const menuItems = [
      this.menuOptions('home', '/'),
      this.menuOptions('messages', '/messages')
    ];

    const userMenuItems = [
      this.submenuOptions('editar perfil', 'user', '/profile'),
      this.submenuOptions('sair', 'power', '/logout')
    ];

    return (
      <Fragment>
        <Menu items={menuItems} activeRoute={activeRoute}>
          <UserMenu
            items={userMenuItems}
            activeRoute={activeRoute}
            user={user}
          />
        </Menu>
        {children}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

MenuContainer = connect(
  mapStateToProps,
  null
)(MenuContainer);

MenuContainer.displayName = 'MenuContainer';

export default withRouter(MenuContainer);