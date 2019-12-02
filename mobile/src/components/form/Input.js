import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, View } from 'react-native';
import { Input as NativeInput } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import { Spacing } from 'styles';

const Input = props => {
  const { iconName, iconColor } = props;
  const { name, type, placeholder, value, onChange, onBlur, ...rest } = props;

  const icon = Platform.OS === 'ios' ? `ios-${iconName}` : `md-${iconName}`;
  let keyboardType = 'default';
  if (type === 'number') {
    keyboardType = 'numeric';
  } else if (type === 'email') {
    keyboardType = 'email-address';
  }

  return (
    <View style={styles.container}>
      <NativeInput
        {...rest}
        onChangeText={onChange}
        onBlur={onBlur}
        leftIcon={<Ionicons name={icon} size={28} color={iconColor} />}
        leftIconContainerStyle={styles.icon}
        placeholderTextColor="grey"
        name={name}
        value={value}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={type === 'password'}
        keyboardType={keyboardType}
        clearTextOnFocus={type === 'password'} // iOS only
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Spacing.smallMargin,
    justifyContent: 'center',
  },
  icon: {
    marginRight: Spacing.SMALL,
  },
  input: {
    margin: Spacing.SMALL,
  },
});

Input.defaultProps = {
  iconColor: '#2C384A',
};

Input.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
