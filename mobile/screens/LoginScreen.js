import React, { useState } from 'react';
import { View } from 'react-native';

import styles from '../components/styles';
import Button from '../components/Button';
import FormItem from '../components/FormItem';

export const navigationOptions = ({ navigation }) => ({ header: null });

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    fetch('http://10.181.21.141:8000/users/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        email: 'calexandrevieira@yahoo.com.br',
        password: 'teste@123'
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
    props.navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <FormItem title={'Email'} value={email} onChange={setEmail} />
        <FormItem title={'Senha'} value={password} onChange={setPassword} />
        <Button style={styles.formButton} title={'Login'} onPress={onSubmit} />
      </View>
    </View>
  );
};

export default LoginScreen;
