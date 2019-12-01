import React from 'react';
import PropTypes from 'prop-types';
import { Button as ElementsButton } from 'react-native-elements';
import { StyleSheet } from 'react-native';

import { Colors, Spacing } from 'styles';

const Button = props => {
  const { title, onPress, buttonType, ...rest } = props;
  console.log(buttonType);
  const styles = createStyles(buttonType);

  return (
    <ElementsButton
      title={title}
      onPress={onPress}
      buttonStyle={styles.button}
      titleStyle={styles.text}
      {...rest}
    />
  );
};

const createStyles = (buttonType) => {
  let buttonTheme = {};
  let textTheme = {};
  if (buttonType === 'solid') {
    buttonTheme = Colors.button.primary;
    textTheme = Colors.text.secondary;
  } else if (buttonType === 'outline') {
    buttonTheme = Colors.button.primaryOutline;
    textTheme = Colors.text.primaryOutline;
  } else {
    buttonTheme = Colors.button.primaryClear;
    textTheme = Colors.text.primaryOutline;
  }

  return StyleSheet.create({
    button: {
      ...Spacing.smallSpacingRounded,
      ...buttonTheme,
    },
    text: {
      ...textTheme,
    }
  });
};

Button.defaultProps = {
  buttonType: 'solid',
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default Button;