import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from 'screens/AuthLoadingScreen';
import LoginScreen from 'screens/LoginScreen';
import ForgotPasswordScreen from 'screens/ForgotPasswordScreen';
import RegisterScreen from 'screens/RegisterScreen';
import { CustomerHome } from 'screens/customer';
import { WorkerHome } from 'screens/worker';

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
  },
  {
    headerMode: 'none'
  },
);

const CustomerStack = createStackNavigator(
  {
    CustomerHome: CustomerHome,
  },
  {
    initialRouteName: 'CustomerHome',
  },
);

const WorkerStack = createStackNavigator(
  {
    WorkerHome: WorkerHome,
  },
  {
    initialRouteName: 'WorkerHome',
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
    },
  )
);
