import React from "react";
import propTypes from "prop-types";
import { Text, TextInput, View } from "react-native";

import styles from "./styles";

const FormItem = props => (
  <View style={styles.formItem}>
    <Text>{props.title}</Text>
    <TextInput onChange={props.onChange} value={props.value} />
  </View>
);

FormItem.propTypes = {
  title: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired
};

export default FormItem;
