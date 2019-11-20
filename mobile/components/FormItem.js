import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { Text, TextInput, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import styles from './styles';

const FormItem = props => (
  <View style={styles.formItem}>
    {/*<Text>{props.title}</Text>*/}
    <TextInput      
      style={styles.formInput}
      onChangeText={props.onChange}
      value={props.value}
      placeholder={props.title}
      keyboardType={props.keyboardType}
      textContentType={props.textContentType}
      secureTextEntry={props.secureTextEntry}
      />
  </View>
    /*<Fragment>
        <FormLabel>{props.title}</FormLabel>
        <FormInput onChangeText={props.onChange} value={props.value}/>
        <FormValidationMessage>Error message</FormValidationMessage>
    </Fragment>*/
);

FormItem.propTypes = {
  title: propTypes.string.isRequired,
  value: propTypes.string,
  onChange: propTypes.func.isRequired
};

export default FormItem;