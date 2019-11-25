/* eslint-disable no-template-curly-in-string */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import { generateValidationSchema } from './validations';
import BasicForm from './BasicForm';

const FormikForm = props => {
  const apiErrorsCheck = (props, apiErrors, field) => {
    const error = props.errors[field.name];
    const apiError = apiErrors === undefined ? null : apiErrors[field.name];
    return error || apiError;
  };

  const checkGeneralErrors = (isValid, fields, apiErrors) => {
    if (!isValid) {
      return { hasError: true, apiGeneralErrors: null };
    }
    if (!_.isEmpty(apiErrors)) {
      return { hasError: true, apiGeneralErrors: apiErrors };
    }

    return { hasError: false, apiGeneralErrors: null };
  };

  const renderForm = (props, fields, apiErrors, onFieldChange, title) => {
    const { values, isValid, isSubmitting, handleSubmit, handleReset } = props;
    let mappedFields = fields.map(field => ({
      ...field,
      touched: props.touched[field.name],
      errors: apiErrorsCheck(props, apiErrors, field, values)
    }));

    const { hasError, apiGeneralErrors } = checkGeneralErrors(isValid, mappedFields, apiErrors);

    return (
      <BasicForm
        title={title}
        hasError={hasError}
        formErrors={apiGeneralErrors}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
        isSubmitting={isSubmitting}
        fieldConfig={mappedFields}
        onFieldChange={onFieldChange}
      />
    );
  };

  const { fields, title, apiErrors, onFieldChange, ...rest } = props;
  return (
    <Formik
      {...rest}
      validationSchema={generateValidationSchema(fields)}
      render={props => renderForm(props, fields, apiErrors, onFieldChange, title)}
    />
  );
};

FormikForm.propTypes = {
  title: PropTypes.string.isRequired,
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
      label: PropTypes.string,
      required: PropTypes.bool.isRequired,
      validators: PropTypes.any
    })
  ).isRequired,
  apiErrors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func,
  onFieldChange: PropTypes.func
};

export default FormikForm;