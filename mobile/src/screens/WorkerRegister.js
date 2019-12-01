import React, { Fragment } from 'react'
import { SafeAreaView, View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { SimpleForm } from 'components/form';

import styles from './styles';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Insira um email válido')
    .required('Esse campo é obrigatório'),
  password: Yup.string()
    .label('Password')
    .required('Esse campo é obrigatório')
});

class WorkerRegister extends React.Component {
  goToSignup = () => this.props.navigation.navigate('HomeScreen');

  handleSubmit = values => {
    if (values.email.length > 0 && values.password.length > 0) {
      setTimeout(() => {
        this.props.navigation.navigate('App')
      }, 3000)
    }
  };

  render() {
    const fields = [
      {
        name: 'email',
        type: 'text',
        icon: 'user',
        placeholder: 'Email',
        required: true
      },
      {
        name: 'password',
        type: 'text',
        icon: 'lock',
        placeholder: 'Senha',
        required: true
      }
    ];

    return (
      <SafeAreaView style={styles.container}>
        <SimpleForm
          title='Entrar'
          initialValues={{email: '', password: ''}}
          fields={fields}
          onSubmit={this.handleSubmit}
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

export default WorkerRegister;