import React from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, View } from "react-native";
import { Button as ReactButton} from 'react-native-elements'

import styles from "./styles";

const Button = props => (
  /*<TouchableOpacity onPress={props.onPress} style={{padding: 12}}>
    <View  style={styles.formButton}>
      <Text style={styles.formItem}>{props.title}</Text>
    </View>
  </TouchableOpacity>*/
  /* Os estilo ainda não está bom, deixei só pra exemplo mesmo*/
  <ReactButton
  style={styles.formButton}
  type="solid"
  title={props.title}
  onPress={props.onPress}  
  />
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default Button;