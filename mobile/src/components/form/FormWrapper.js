import React from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import PropTypes from 'prop-types';

const FormWrapper = props => {
  if (props.loading) {
    return (
      <View style={styles.container}>
        {props.children}
        <View style={styles.loading}>
          <ActivityIndicator size='large'/>
        </View>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {props.children}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: 'center',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

FormWrapper.defaultProps = {
  loading: false,
  error: false,
};

FormWrapper.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default FormWrapper;