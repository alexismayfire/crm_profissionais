import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from 'screens/AuthLoadingScreen';
import LoginScreen from 'screens/LoginScreen';
import { CustomerHome } from 'screens/customer';
import { WorkerHome } from 'screens/worker';

const AuthStack = createStackNavigator(
  { Login: LoginScreen },
  { headerMode: 'none' }
  );

const CustomerStack = createStackNavigator(
  {
    CustomerHome: CustomerHome,
  },
);

const WorkerStack = createStackNavigator(
  {
    WorkerHome: WorkerHome,
  },
);

export default createAppContainer(
  createSwitchNavigator(
      {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      AuthLoading: AuthLoadingScreen,
      // App: MainTabNavigator,
      Customer: CustomerStack,
      Worker: WorkerStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
