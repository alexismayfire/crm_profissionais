import React from 'react';
import { Picker} from 'react-native';
import PropTypes from 'prop-types';

import Input from './Input';

const FieldWrapper = props => {
  const { type, placeholder, icon, options } = props;
  const { field, onChange, onBlur } = props;

  return type === 'select' ?
    (
      <Picker
        name={field.name}
        selection
        options={options}
        {...field}
        onValueChange={onChange}
      />
    ) : (
      <Input
        type={type}
        iconName={icon}
        name={field.name}
        placeholder={placeholder}
        {...field}
        onChange={onChange}
        onBlur={onBlur}
      />
    );
};

FieldWrapper.propTypes = {
  type: PropTypes.oneOf(
    ['text', 'email', 'select', 'datetime', 'password']
  ).isRequired,
};

export default FieldWrapper;