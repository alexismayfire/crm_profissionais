import React from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";

const Button = props => (
  <TouchableOpacity onPress={props.onPress}>
    <View>
      <Text style={styles.formItem}>{props.title}</Text>
    </View>
  </TouchableOpacity>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default Button;
