import React from 'react';
import { StyleSheet, View } from "react-native";
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';

import { Colors, Spacing } from 'styles';

const Error = props => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {props.error}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...Colors.background.error,
    ...Spacing.smallSpacingRounded,
  },
  text: {
    ...Colors.text.error,
  }
});

Error.propTypes = {
  error: PropTypes.string.isRequired,
};

export default Error;