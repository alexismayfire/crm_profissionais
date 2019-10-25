import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen, {
  navigationOptions as loginNavigationOptions
} from "../screens/LoginScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

export const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.path = "";

export const LoginStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: loginNavigationOptions
    }
  },
  config
);

LoginStack.path = "";
