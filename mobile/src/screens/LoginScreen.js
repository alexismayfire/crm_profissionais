import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Containers } from 'styles';
import { login, cleanApiErrors } from 'actions/user/actions';
import { ButtonGroup } from 'components/base';
import { SimpleForm } from 'components/form';

class LoginScreen extends React.Component {
  state = {
    fields: [
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
    ],
  };

  handleSubmit = (values, formikProps) => {
    const { email, password } = values;
    const { navigation } = this.props;
    this.props.loginAction(email, password, navigation, formikProps.setSubmitting);
    const { fields } = this.state;
    const touched = {};
    for (const field of fields) {
      touched[field.name] = false;
    }
  };

  render() {
    const links = [
      { title: 'Esqueci a senha', screen: 'ForgotPassword' },
      { title: 'Registrar', screen: 'Register' },
    ];

    return (
      <SafeAreaView style={styles.container}>
        <SimpleForm
          title='Entrar'
          initialValues={{
            email: 'calexandrevieira@yahoo.com.br',
            password: 'teste@123'
          }}
          fields={this.state.fields}
          onSubmit={this.handleSubmit}
          apiErrors={this.props.user.errors}
          cleanApiErrors={this.props.cleanApiErrorsAction}
          containerSize={2}
          containerCentered={false}
        />
        <ButtonGroup
          links={links}
          verticallyCentered
          buttonType='clear'
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...Containers.createStyles.screen(),
  }
});

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