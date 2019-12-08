import React from 'react';
import { Platform } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  NavigationActions,
  StackActions,
} from 'react-navigation';
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import AuthLoadingScreen from 'screens/AuthLoadingScreen';
import LoginScreen from 'screens/LoginScreen';
import ForgotPasswordScreen from 'screens/ForgotPasswordScreen';
import RegisterScreen from 'screens/RegisterScreen';
import { CustomerHome, CustomerServiceList } from 'screens/customer';
import { WorkerHome, ServiceList, ServiceForm, CustomerList } from 'screens/worker';

const renderDrawer = (navigation, title, icon = 'menu') => {
  const drawerIcon = Platform.OS === 'ios' ? `ios-${icon}` : `md-${icon}`;
  return {
    title,
    headerLeft: (
      <Ionicons
        name={drawerIcon}
        size={36}
        style={{ marginLeft: 10 }}
        onPress={() => navigation.toggleDrawer()}
      />
    ),
  };
};

const renderCustomAction = (navigation, screen = null, icon = 'add') => {
  if (screen) {
    const actionIcon = Platform.OS === 'ios' ? `ios-${icon}` : `md-${icon}`;
    return {
      headerRight: (
        <Ionicons
          name={actionIcon}
          size={36}
          style={{ marginRight: 10 }}
          onPress={() => {
            // https://reactnavigation.org/docs/en/stack-actions.html
            // TODO: aqui não está zerando a stack... tentar com NavigationActions.reset??
            // Também poderia mandar um parâmetro e o ServiceForm verifica no componentDidUpdate
            // Dispara uma action do Redux só pra limpar o worker.job!
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: screen, params: {} }),
              ],
            });
            navigation.dispatch(resetAction);
          }}
        />
      ),
    };
  }
  return {};
};

const renderDrawerAddButton = (navigation, title, screenAction) => ({
  ...renderDrawer(navigation, title),
  ...renderCustomAction(navigation, screenAction),
});

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
    headerMode: 'none',
  }
);

const CustomerStack = createStackNavigator(
  {
    CustomerHome: CustomerHome,
    ServiceList: CustomerServiceList
  },
  {
    initialRouteName: 'CustomerHome',
  }
);

const WorkerProfileStack = createStackNavigator({
  WorkerHome: {
    screen: WorkerHome,
    navigationOptions: ({ navigation }) =>
      renderDrawer(navigation, 'Meu Perfil'),
  },
});

const WorkerServiceStack = createStackNavigator({
  ServiceList: {
    screen: ServiceList,
    navigationOptions: ({ navigation }) =>
      renderDrawerAddButton(navigation, 'Meus Serviços', 'ServiceForm'),
  },
  ServiceForm: {
    screen: ServiceForm,
    navigationOptions: ({ navigation }) =>
      renderDrawer(navigation, 'Criar Serviço'),
  },
});

const WorkerStack = createDrawerNavigator({
  Profile: {
    screen: WorkerProfileStack,
    navigationOptions: {
      title: 'Perfil',
    },
  },
  Service: {
    screen: WorkerServiceStack,
    navigationOptions: { title: 'Serviços' },
  },
  Customer: {
    screen: CustomerList,
    navigationOptions: { title: 'Meus Clientes' },
  }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      AuthLoading: AuthLoadingScreen,
      // App: MainTabNavigator,
      Customer: CustomerStack,
      Worker: WorkerStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
