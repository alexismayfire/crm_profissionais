import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';

import styles from './styles';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const user = await AsyncStorage.getItem('user');
    this.props.navigation.navigate(user ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
}

export default AuthLoadingScreen;