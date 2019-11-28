import React from 'react';
import PropTypes from 'prop-types';
import { Button as ReactButton} from 'react-native-elements'

import styles from './styles';

const Button = props => (
  <ReactButton
    title={props.title}
    type='solid'
    onPress={props.onPress}
    style={styles.formButton}
  />
);

Button.defaultProps = {
  type: 'solid'
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'solid', 'clear', 'outline'
  ]).isRequired,
  onPress: PropTypes.func.isRequired
};

export default Button;