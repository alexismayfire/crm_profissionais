import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import { generateValidationSchema } from './validations';
import BasicForm from "./BasicForm";

const FormikForm = props => {
  const { title, initialValues, fields, onSubmit, apiErrors, cleanApiErrors } = props;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={generateValidationSchema(fields)}
    >
      {formikProps =>
        <BasicForm
          title={title}
          fieldConfig={fields}
          apiErrors={apiErrors}
          cleanApiErrors={cleanApiErrors}
          {...formikProps}
        />
      }
    </Formik>
  );
};

FormikForm.propTypes = {
  title: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      required: PropTypes.bool.isRequired
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  apiErrors: PropTypes.object,
  cleanApiErrors: PropTypes.func,
};

export default FormikForm;