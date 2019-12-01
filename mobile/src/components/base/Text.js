import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Text as ElementsText } from 'react-native-elements';

const Text = props => {
  const { alignment, style: styleProps, ...rest } = props;
  const styles = createStyles(alignment);

  return (
    <ElementsText style={[styles.text, styleProps]} {...rest}>
      {props.children}
    </ElementsText>
  );
};

const createStyles = (alignment) => StyleSheet.create({
  text: {
    textAlign: alignment
  },
});

Text.defaultProps = {
  alignment: 'left',
};

Text.propTypes = {
  alignment: PropTypes.oneOf(
    ['left', 'right', 'center', 'justify']
  ).isRequired,
};

export default Text;
