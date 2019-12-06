import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { loadTokenFromStorage } from 'actions/user/actions';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    this.props.navigation.navigate('Auth');
    /*
    TODO: incluir novamente, após incluir um checkbox 'Lembrar-me' na LoginScreen
    
    const authDetails = await AsyncStorage.getItem('authDetails');
    
    if (authDetails) {
      const { token, isCustomer } = JSON.parse(authDetails);
      this.props.loadTokenFromStorage(token);
      const screen = isCustomer ? 'Customer' : 'Worker';
      this.props.navigation.navigate(screen);
    } else {
      this.props.navigation.navigate('Auth');
    }
    */
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
}

const mapDispatchToProps = {
  loadTokenFromStorage,
};

AuthLoadingScreen = connect(
  null,
  mapDispatchToProps,
)(AuthLoadingScreen);

AuthLoadingScreen.displayName = 'AuthLoadingScreen';

export default AuthLoadingScreen;