import React, { useState } from 'react';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';

import styles from '../components/styles';
import Button from '../components/Button';
import FormItem from '../components/FormItem';

export const navigationOptions = ({ navigation }) => ({ header: null });

const useSignUpForm = callback => {
  const [inputs, setInputs] = useState({});

  const handleSubmit = (event, inputs) => {
    if (event) {
      event.preventDefault();
    }
    console.log(inputs);
    callback(inputs);
  };
  const handleInputChange = event => {
    event.persist();
    console.log(event.target);

    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  return { handleSubmit, handleInputChange, inputs };
};

class RegisterScreen extends React.Component {
  state = { first_name: '', last_name:'',  email: '', mobile_number: '', password: '', password_confirm: '', errors: {} };

  register = async event => {
    if (event) {
      event.preventDefault();
    }
    alert('cadastra esse carinha')
    /*try {      
      const { email, password } = this.state;
      console.log(email, password);
      const res = await axios.post('http://192.168.15.9:8000/users/login/', {
        email,
        password
      });
      console.log(res);
      // Aqui deve setar o estado da aplicação (no Redux)
      console.log(this.props);
      this.props.navigation.navigate('Main');
    } catch (err) {
      this.setState({ errors: err.response.data });
    }*/
  };

  voltar = async event => {
    alert('voltar para tela de login')
  };

  renderErrors = () => {
    const { errors } = this.state;
    if (errors.password) {
      return <Text>{errors.password[0]}</Text>;
    } else if (errors.non_field_erros) {
      return <Text>{errors.non_field_erros[0]}</Text>;
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.form}>
        <FormItem
            title={'Nome'}
            name={'first_name'}
            value={this.state.first_name}
            onChange={first_name => this.setState({ first_name })}
            textContentType={'name'}
          />
          <FormItem
            title={'Sobrenome'}
            name={'last_name'}
            value={this.state.last_name}
            onChange={last_name => this.setState({ last_name })}
            textContentType={'familyName'}
          />
          <FormItem
            title={'Email'}
            name={'email'}
            value={this.state.email}
            onChange={email => this.setState({ email })}
            keyboardType={'email-address'}
            textContentType={'emailAddress'}
          />
          <FormItem
            title={'Celular'}
            name={'mobile_number'}
            value={this.state.mobile_number}
            onChange={mobile_number => this.setState({ mobile_number })}
            keyboardType={'phone-pad'}
            textContentType={'telephoneNumber'}
          />
          <FormItem
            title={'Senha'}
            name={'password'}
            value={this.state.password}
            onChange={password => this.setState({ password })}
            textContentType={'newPassword'}
            secureTextEntry={true}
          />
          {/*<FormItem
            title={'Confirma sua Senha'}
            name={'password_confirm'}
            value={this.state.password_confirm}
            onChange={password_confirm => this.setState({ password_confirm })}
          />*/}
          {this.renderErrors()}
          <Button
            style={styles.formButton}
            title={'Enviar'}
            onPress={this.register}
          />
          <Button
            style={{borderWidth: 10}}
            title={'Voltar'}
            onPress={this.voltar}
          />
          {/* O botão some quando o keyboard avoiding é ativado*/}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default RegisterScreen;