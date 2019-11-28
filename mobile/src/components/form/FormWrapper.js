import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';

import styles from './styles';

const FormWrapper = props => {
  if (props.loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {props.children}
      </View>
    </TouchableWithoutFeedback>
  );
};

FormWrapper.defaultProps = {
  loading: false,
  error: false,
};

FormWrapper.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default FormWrapper;