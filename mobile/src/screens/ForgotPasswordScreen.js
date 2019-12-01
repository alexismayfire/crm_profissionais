import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { Containers } from 'styles';
import { cleanApiErrors, forgotPassword } from 'actions/user/actions';
import { Button, Message } from "components/base";
import { SimpleForm } from 'components/form';

class ForgotPasswordScreen extends React.Component {
  state = {
    fields: [
      {
        name: 'email',
        type: 'email',
        icon: 'person',
        placeholder: 'Email',
        required: true
      },
    ],
  };

  componentDidMount() {
    this.props.cleanApiErrorsAction();
  }

  navigateHome = () => {
    this.props.navigation.navigate('Login');
  };

  handleSubmit = (values, formikProps) => {
    const { email } = values;
    this.props.forgotPasswordAction(email, formikProps.setSubmitting);
    const { fields } = this.state;
    const touched = {};
    for (const field of fields) {
      touched[field.name] = false;
    }
  };

  showMessage = () => {
    const { user } = this.props;
    if (user.message) {
      return (
        <Message content={user.message} />
      );
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SimpleForm
          title='Esqueci a senha'
          initialValues={{ email: 'calexandrevieira@yahoo.com.br' }}
          fields={this.state.fields}
          onSubmit={this.handleSubmit}
          apiErrors={this.props.user.errors}
          cleanApiErrors={this.props.cleanApiErrorsAction}
          containerSize={2}
          containerCentered={false}
        />
        <View style={styles.messageContainer}>
          {this.showMessage()}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title='Voltar'
            onPress={this.navigateHome}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Containers.createStyles.screen(),
  },
  messageContainer: {
    flex: 1,
  },
});

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = {
  forgotPasswordAction: forgotPassword,
  cleanApiErrorsAction: cleanApiErrors,
};

ForgotPasswordScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordScreen);

ForgotPasswordScreen.displayName = 'ForgotPasswordScreen';

export default ForgotPasswordScreen;