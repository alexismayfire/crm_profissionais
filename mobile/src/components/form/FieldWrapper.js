import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';
import Picker from './Picker';
import ImagePicker from './ImagePicker';

const FieldWrapper = props => {
  const { type, label, placeholder, icon, options } = props;
  const { field, form, onChange, onBlur } = props;

  if (type === 'select') {
    let title;
    for (const option of options) {
      if (option.value === field.value) {
        title = option.text;
      }
    }

    if (title === undefined) {
      console.log(field);
    }

    return (
      <Picker
        title={title}
        field={field}
        label={label}
        options={options}
        setFieldValue={form.setFieldValue}
      />
    );
  } else if (type === 'image') {
    return (
      <ImagePicker
        title={label}
        field={field}
        placeholder={placeholder}
        setFieldValue={form.setFieldValue}
        helpers={props.helpers}
      />
    );
  } else {
    return (
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
  }
};

FieldWrapper.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'textarea',
    'number',
    'email',
    'select',
    'datetime',
    'password',
    'image',
  ]).isRequired,
};

export default FieldWrapper;
