import React, { useState } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

import styles from '../components/styles';
import Button from '../components/Button';
import FormItem from '../components/FormItem';

export const navigationOptions = ({ navigation }) => ({ header: null });

const useSignInForm = callback => {
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

class LoginScreen extends React.Component {
  state = { email: '', password: '', errors: {} };

  login = async event => {
    if (event) {
      event.preventDefault();
    }
    try {
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
    }
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
      <View style={styles.container}>
        <View style={styles.form}>
          <FormItem
            title={'Email'}
            name={'email'}
            value={this.state.email}
            onChange={email => this.setState({ email })}
          />
          <FormItem
            title={'Senha'}
            name={'password'}
            value={this.state.password}
            onChange={password => this.setState({ password })}
          />
          {this.renderErrors()}
          <Button
            style={styles.formButton}
            title={'Login'}
            onPress={this.login}
          />
        </View>
      </View>
    );
  }
}

export default LoginScreen;
