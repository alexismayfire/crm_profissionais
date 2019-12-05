import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Form, Input } from 'semantic-ui-react';

import AnimatedErrorMessage from './AnimatedErrorMessage';

const FormField = props => {
  // Adicionado os parametros para setar placeholder e icon
  const renderInput = (type, field, placeholder, icon) => {
    // Esse trecho é para redefinir o onChange, e apagar qualquer erro
    // no formulário que não seja relacionado a um campo
    // onFieldChange é um action creator do Redux!
    const { onChange, ...rest } = field;
    let onFieldChange;

    if (props.formErrors) {
      const isFieldError = props.formErrors.hasOwnProperty(rest.name);
      const isGeneralError = props.formErrors.hasOwnProperty(
        'non_field_errors'
      );
      if ((isFieldError || isGeneralError) && props.onFieldChange) {
        onFieldChange = (e, { name, field }) => {
          onChange(name, field);
          props.onFieldChange(name);
        };
      } else {
        onFieldChange = onChange;
      }
    } else {
      onFieldChange = onChange;
    }

    return (
      <Input
        iconPosition="left"
        type={type}
        icon={icon}
        placeholder={placeholder}
        {...rest}
        onChange={onFieldChange}
      />
    );
  };

  const renderSelect = (options, field, setFieldValue, setFieldTouched) => {
    const onChange = (e, { name, value }) => setFieldValue(name, value);
    const onBlur = (e, { name }) => setFieldTouched(name, true);

    return (
      <Dropdown
        name={field.name}
        selection
        options={options}
        {...field}
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  };

  const renderField = props => {
    const { type, placeholder, icon, options } = props;
    const {
      field,
      form: { setFieldValue, setFieldTouched },
    } = props;

    if (type === 'select') {
      return renderSelect(options, field, setFieldValue, setFieldTouched);
    } else {
      return renderInput(type, field, placeholder, icon);
    }
  };

  const { field, width, required, apiErrors } = props;
  const {
    form: { touched, errors },
  } = props;

  const isTouched = touched.hasOwnProperty(field.name);
  const hasError = errors.hasOwnProperty(field.name) || apiErrors !== undefined;

  return (
    <Fragment>
      <Form.Field width={width} required={required}>
        {renderField(props)}
      </Form.Field>
      {hasError && (
        <AnimatedErrorMessage
          hasError={hasError}
          touched={isTouched}
          error={errors[field.name] || apiErrors}
        />
      )}
    </Fragment>
  );
};

FormField.propTypes = {
  field: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
    ).isRequired,
    errors: PropTypes.objectOf(PropTypes.string).isRequired,
  }),
  type: PropTypes.oneOf([
    'text',
    'email',
    'select',
    'datetime',
    'password',
    'number',
  ]).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number.isRequired,
      value: PropTypes.any,
      text: PropTypes.string,
    })
  ),
  formErrors: PropTypes.object,
};

export default FormField;
