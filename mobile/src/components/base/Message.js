import React from 'react';
import { StyleSheet, View } from "react-native";
import PropTypes from 'prop-types';

import { Colors, Spacing } from 'styles';
import Text from './Text';

const Message = props => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {props.content}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...Colors.background.success,
    ...Spacing.smallSpacingRounded,
  },
  text: {
    ...Colors.text.success,
  }
});

Message.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Message;