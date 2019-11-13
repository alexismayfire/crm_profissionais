import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Dropdown, Form, Input } from "semantic-ui-react";

import AnimatedErrorMessage from "./AnimatedErrorMessage";

const FormField = props => {
  // Adicionado os parametros para setar placeholder e icon
  const renderInput = (type, field, placeholder, icon) => {
    return <Input iconPosition='left' type={type} icon={icon} placeholder={placeholder} {...field} />;
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
    const {
      type,
      placeholder,
      icon,
      options,
      field,
      form: { setFieldValue, setFieldTouched }
    } = props;

    if (type === "select") {
      return renderSelect(options, field, setFieldValue, setFieldTouched);
    } else {
      return renderInput(type, field, placeholder, icon);
    }
  };

  const {
    field,
    form: { touched, errors },
    label,
    width,
    required
  } = props;

  const hasError = errors.hasOwnProperty(field.name);
  const isTouched = touched.hasOwnProperty(field.name);

  return (
    <Fragment>
      <Form.Field width={width} required={required}>
        {/* <label>{label}</label> */}
        {renderField(props)}
      </Form.Field>
      <AnimatedErrorMessage
        hasError={hasError}
        touched={isTouched}
        error={errors[field.name]}
      />
    </Fragment>
  );
};

FormField.propTypes = {
  field: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
    ).isRequired,
    errors: PropTypes.objectOf(PropTypes.string).isRequired
  }),
  type: PropTypes.oneOf(["text", "email", "select", "datetime"]).isRequired,
  label: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number.isRequired,
      value: PropTypes.any.isRequired,
      text: PropTypes.string.isRequired
    })
  )
};

export default FormField;
