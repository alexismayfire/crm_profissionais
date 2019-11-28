import React, { Fragment } from 'react';
import { Dimensions, SafeAreaView, View } from 'react-native';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Text } from 'react-native-elements';

import styles from './styles';
import Button from './Button';
import FieldWrapper from './FieldWrapper';
import FormWrapper from './FormWrapper';
import Error from './Error';

const renderFieldError = (touched, errors, name) => {
  if (touched[name] && errors[name]) {
    return <Error error={errors[name]} />
  }
};

const renderFormError = (status) => {
  if (status && status.hasOwnProperty('errors')) {
    return <Error error={status.errors} />
  }
};

const BasicForm = props => {
  const { height, width } = Dimensions.get('window');
  const { title, fieldConfig, apiErrors, cleanApiErrors, ...formikProps } = props;
  const { handleBlur, handleChange, handleSubmit } = formikProps;
  const { isSubmitting, isValid, setStatus } = formikProps;
  const { errors, touched, status } = formikProps;

  const { non_field_errors } = apiErrors;
  if (non_field_errors && status === undefined) {
    setStatus({ errors: non_field_errors });
  }

  return (
    <SafeAreaView style={styles.container}>
      <FormWrapper
        loading={isSubmitting}
        error={!isValid || (status && status.hasOwnProperty('errors'))}
      >
        <Text h2 style={{ textAlign: 'center' }}>{title}</Text>
        {fieldConfig.map((config, x) => (
          <Fragment key={x}>
            <Field
              component={FieldWrapper}
              onChange={handleChange(config.name)}
              onBlur={handleBlur(config.name)}
              {...config}
            />
            {renderFieldError(touched, errors, config.name)}
          </Fragment>
        ))}
        {renderFormError(status)}
        <View style={styles.formButton}>
          <Button
            title='Enviar'
            disabled={!isValid}
            onPress={handleSubmit}
          />
        </View>
      </FormWrapper>
    </SafeAreaView>
  );
};

BasicForm.propTypes = {
  title: PropTypes.string.isRequired,
  fieldConfig: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      required: PropTypes.bool.isRequired
    })
  ).isRequired,
  apiErrors: PropTypes.object,
  cleanApiErrors: PropTypes.func,
};

export default BasicForm;