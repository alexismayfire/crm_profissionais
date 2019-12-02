import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import { generateValidationSchema } from './validations';
import BasicForm from './BasicForm';

const FormikForm = props => {
  const {
    title,
    initialValues,
    fields,
    onSubmit,
    apiErrors,
    cleanApiErrors,
  } = props;

  const { containerSize, containerCentered } = props;
  const styles = createStyles(containerSize, containerCentered);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={generateValidationSchema(fields)}
      >
        {formikProps => (
          <BasicForm
            title={title}
            fieldConfig={fields}
            apiErrors={apiErrors}
            cleanApiErrors={cleanApiErrors}
            {...formikProps}
          />
        )}
      </Formik>
    </View>
  );
};

const createStyles = (size, centered) =>
  StyleSheet.create({
    container: {
      flex: size,
      justifyContent: centered ? 'center' : 'flex-end',
    },
  });

FormikForm.defaultProps = {
  containerSize: 1,
  containerCentered: true,
};

FormikForm.propTypes = {
  title: PropTypes.string,
  initialValues: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      required: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  apiErrors: PropTypes.object,
  cleanApiErrors: PropTypes.func,
  containerSize: PropTypes.number,
  containerCentered: PropTypes.bool,
};

export default FormikForm;
