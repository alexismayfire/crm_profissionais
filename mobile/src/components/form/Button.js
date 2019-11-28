import React from 'react';
import PropTypes from 'prop-types';
import { Button as ElementsButton } from 'react-native-elements';

const Button = ({ title, buttonType, buttonColor, ...rest }) => (
  <ElementsButton
    {...rest}
    title={title}
    type={buttonType}
    titleStyle={{ color: buttonColor }}
    buttonStyle={{ borderColor: buttonColor, borderRadius: 20 }}
  />
);

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