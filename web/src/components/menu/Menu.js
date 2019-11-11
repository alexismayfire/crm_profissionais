import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';

class MenuNavBar extends Component {
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const activeItem = this.props.match.url;
      const items = [
        {name: 'home', route: '/'}, 
        {name: 'messages', route: '/messages'}, 
        {name: 'login', route: '/login'},
        {name: 'customer home', route: '/customer/home'},
        {name: 'worker home', route: '/worker/home'}
      ];
  
      return (
          <div>
            <Menu pointing secondary>
              {items.map((item, x) => (
                <Menu.Item 
                  key={x} 
                  name={item.name} 
                  active={item.route === activeItem} 
                  onClick={this.handleItemClick}
                  as={ Link } to={item.route}
                  />
              ))}
              <Menu.Menu position='right'>
                <Menu.Item
                  name='logout'
                  active={activeItem === 'logout'}
                  onClick={this.handleItemClick}                
                >
                   <Icon name="user" />
                    Sair
                </Menu.Item>
              </Menu.Menu>
            </Menu>

            { this.props.children }
          </div>
      )
    }
  }

export default withRouter(MenuNavBar);