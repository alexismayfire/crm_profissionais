import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

import { Containers } from 'styles';

const RegisterScreen = props => (
  <SafeAreaView style={styles.container}>
    <Text>RegisterScreen</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    ...Containers.createStyles.screen()
  },
});

export default RegisterScreen;