import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'formik';

import { Spacing } from 'styles';
import { Button, Text } from 'components/base';
import FieldWrapper from './FieldWrapper';
import FormWrapper from './FormWrapper';
import Error from './Error';

const renderFieldError = (touched, errors, apiErrors, name) => {
  let error = null;
  if (touched[name]) {
    if (errors[name]) {
      error = errors[name];
    } else if (apiErrors[name]) {
      error = apiErrors[name];
    }
    if (error) {
      return <Error error={error} />;
    }
  }
};

const renderFormError = status => {
  if (status && status.hasOwnProperty('errors')) {
    return <Error error={status.errors} />;
  }
};

const renderTitle = title => {
  if (title) {
    return (
      <Text h2 alignment="center">
        {title}
      </Text>
    );
  }
};

const BasicForm = props => {
  const {
    title,
    fieldConfig,
    apiErrors,
    cleanApiErrors,
    ...formikProps
  } = props;
  const { handleBlur, handleChange, handleSubmit } = formikProps;
  const { isSubmitting, isValid, setStatus } = formikProps;
  const { errors, touched, status, values } = formikProps;

  const { non_field_errors } = apiErrors;
  if (non_field_errors && status === undefined) {
    setStatus({ errors: non_field_errors });
  }

  return (
    <FormWrapper
      loading={isSubmitting}
      error={!isValid || (status && status.hasOwnProperty('errors'))}
    >
      {renderTitle(title)}
      {fieldConfig.map((config, x) => {
        if (config.array) {
          return (
            <FieldArray
              key={x}
              name={config.name}
              render={helpers => (
                <View
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}
                >
                  {values[config.name].map((_, index) => (
                    <View key={index} style={{ flex: 1 }}>
                      <Field
                        component={FieldWrapper}
                        onChange={handleChange(`${config.name}.${index}`)}
                        onBlur={handleBlur(`${config.name}.${index}`)}
                        {...config}
                        name={`${config.name}.${index}`}
                        helpers={helpers}
                      />
                    </View>
                  ))}
                  <Button
                    title="+"
                    onPress={() =>
                      helpers.insert(values[config.name].length, {})
                    }
                  />
                </View>
              )}
            />
          );
        } else {
          return (
            <Fragment key={x}>
              <Field
                component={FieldWrapper}
                onChange={handleChange(config.name)}
                onBlur={handleBlur(config.name)}
                {...config}
              />
              {renderFieldError(touched, errors, apiErrors, config.name)}
            </Fragment>
          );
        }
      })}
      {renderFormError(status)}
      <View style={styles.formButton}>
        <Button title="Enviar" disabled={!isValid} onPress={handleSubmit} />
      </View>
    </FormWrapper>
  );
};

const styles = StyleSheet.create({
  formButton: {
    alignItems: 'stretch',
    ...Spacing.smallSpacing,
  },
});

BasicForm.propTypes = {
  title: PropTypes.string,
  fieldConfig: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      required: PropTypes.bool.isRequired,
    })
  ).isRequired,
  apiErrors: PropTypes.object,
  cleanApiErrors: PropTypes.func,
};

export default BasicForm;
