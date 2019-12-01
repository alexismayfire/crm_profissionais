import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button as ElementsButton } from 'react-native-elements';

import { Colors, Spacing } from 'styles';

const Button = ({ title, buttonType, buttonColor, ...rest }) => (
  <ElementsButton
    {...rest}
    title={title}
    type={buttonType}
    buttonStyle={styles.button}
  />
);

const styles = StyleSheet.create({
  button: {
    ...Spacing.smallSpacingRounded,
    ...Colors.button.primary,
  }
});

Button.defaultProps = {
  buttonType: 'solid',
  buttonColor: '#039BE5'
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  buttonType: PropTypes.oneOf(
    ['solid', 'clear', 'outline']
  ).isRequired,
  buttonColor: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Button;