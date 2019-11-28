import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { connect } from 'react-redux';
import { Button } from 'react-native-elements'

import { login, cleanApiErrors } from 'actions/user/actions';
import styles from './styles';
import { SimpleForm } from 'components/form';

class LoginScreen extends React.Component {
  state = { fields: ['email', 'password' ]};
  goToSignup = () => this.props.navigation.navigate('HomeScreen');

  handleSubmit = (values, formikProps) => {
    const { email, password } = values;
    const { navigation } = this.props;
    this.props.loginAction(email, password, navigation, formikProps.setSubmitting);
    const { fields } = this.state;
    const touched = {};
    for (const field of fields) {
      touched[field] = false;
    }
  };

  render() {
    const fields = [
      {
        name: 'email',
        type: 'email',
        icon: 'person',
        placeholder: 'Email',
        required: true
      },
      {
        name: 'password',
        type: 'password',
        icon: 'lock',
        placeholder: 'Senha',
        required: true
      }
    ];

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <SimpleForm
          title='Entrar'
          initialValues={{email: '', password: ''}}
          fields={fields}
          onSubmit={this.handleSubmit}
          apiErrors={this.props.user.errors}
          cleanApiErrors={this.props.cleanApiErrorsAction}
        />
        <Button
          title='Dont have an account? Sign Up'
          onPress={this.goToSignup}
          titleStyle={{
            color: '#F57C00'
          }}
          type='clear'
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = {
  loginAction: login,
  cleanApiErrorsAction: cleanApiErrors,
};

LoginScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

LoginScreen.displayName = 'LoginScreen';

export default LoginScreen;