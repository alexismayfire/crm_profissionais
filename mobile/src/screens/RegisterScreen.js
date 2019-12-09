import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Containers } from 'styles';
import { register, cleanApiErrors } from 'actions/user/actions';
import { SimpleForm } from 'components/form';

class RegisterScreen extends React.Component {
  state = {
    fields: [
      {
        name: 'name',
        type: 'text',
        icon: 'person',
        placeholder: 'Nome',
        required: true,
      },
      {
        name: 'email',
        type: 'email',
        icon: 'mail',
        placeholder: 'Email',
        required: true,
      },
      {
        name: 'mobile_phone',
        type: 'text',
        icon: 'phone-portrait',
        placeholder: 'Celular',
        required: true,
      },
      {
        name: 'password1',
        type: 'password',
        icon: 'lock',
        placeholder: 'Senha',
        required: true,
      },
      {
        name: 'password2',
        type: 'password',
        icon: 'lock',
        placeholder: 'Confirme sua Senha',
        required: true,
      },
      {
        name: 'is_customer',
        type: 'select',
        label: 'Tipo de Usuário',
        placeholder: 'Tipo de Usuário',
        icon: 'build',
        required: true,
        options: [
          { key: 1, text: '--- Selecione ---', value: null },
          { key: 2, text: 'Cliente', value: true },
          { key: 3, text: 'Profissional', value: false },
        ],
      },
    ],
  };

  handleSubmit = (values, formikProps) => {
    const {
      name,
      email,
      mobile_phone,
      password1,
      password2,
      is_customer,
    } = values;
    const { navigation } = this.props;
    this.props.registerAction(
      name,
      mobile_phone,
      email,
      password1,
      password2,
      is_customer,
      navigation,
      formikProps.setSubmitting
    );
    const { fields } = this.state;
    const touched = {};
    for (const field of fields) {
      touched[field.name] = false;
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView>
          <SimpleForm
            title="Registrar"
            initialValues={{
              name: '',
              email: '',
              mobile_phone: '',
              password1: '',
              password2: '',
              is_customer: null,
            }}
            fields={this.state.fields}
            onSubmit={this.handleSubmit}
            apiErrors={this.props.user.errors}
            cleanApiErrors={this.props.cleanApiErrorsAction}
            containerSize={2}
            containerCentered={false}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Containers.createStyles.screen(),
  },
});

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = {
  registerAction: register,
  cleanApiErrorsAction: cleanApiErrors,
};

RegisterScreen = connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

RegisterScreen.displayName = 'RegisterScreen';

export default RegisterScreen;
