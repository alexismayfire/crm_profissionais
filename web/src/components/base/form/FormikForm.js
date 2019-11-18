/* eslint-disable no-template-curly-in-string */
import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";

import { generateValidationSchema } from "./validations";
import BasicForm from "./BasicForm";

const renderForm = (props, fields) => {
  const { isValid, isSubmitting, handleSubmit, handleReset } = props;

  const mappedFields = fields.map(field => ({
    ...field,
    touched: props.touched[field.name],
    errors: props.errors[field.name]
  }));

  return (
    <BasicForm
      hasError={!isValid}
      handleSubmit={handleSubmit}
      handleReset={handleReset}
      isSubmitting={isSubmitting}
      fieldConfig={mappedFields}
    />
  );
};

const FormikForm = props => {
  const { fields, ...rest } = props;
  return (
    <Formik
      {...rest}
      validationSchema={generateValidationSchema(fields)}
      render={props => renderForm(props, fields)}
    />
  );
};

FormikForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          key: PropTypes.number.isRequired,
          value: PropTypes.any,
          text: PropTypes.string.isRequired
        })
      ]).isRequired,
      label: PropTypes.string.isRequired,
      required: PropTypes.bool.isRequired,
      validators: PropTypes.any
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func
};

export default FormikForm;
