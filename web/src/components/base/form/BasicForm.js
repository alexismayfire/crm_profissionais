import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import ReCAPTCHA from 'react-google-recaptcha';

import { Grid } from 'components/layout';
import FormField from './FormField';
import AnimatedErrorMessage from "./AnimatedErrorMessage";

const BasicForm = props => {
  const [captchaVerified, setCaptcha] = useState(false);
  const { isSubmitting, handleSubmit, hasError, fieldConfig, title } = props;
  const { formErrors, onFieldChange, handleReset, resetToggle } = props;

  const onVerifyCaptcha = (value) => setCaptcha(!!value);

  const showMessage = (formErrors) => {
    if (formErrors && formErrors.hasOwnProperty('non_field_errors')) {
      return (
        <AnimatedErrorMessage
          touched
          hasError={hasError}
          error={formErrors['non_field_errors']}
        />
      );
    }
  };

  return (
    <Segment stacked>
      <Form
        loading={isSubmitting}
        error={hasError}
        className={hasError ? 'error' : ''}
        onSubmit={handleSubmit}
        size='large'
        style={{ textAlign: 'left' }}
      >
        <Header as='h2' color='teal' textAlign='center'>
          {title}
        </Header>
        {fieldConfig.map((config, x) => (
          <Field
            key={x}
            component={FormField}
            onFieldChange={onFieldChange}
            formErrors={formErrors || {}}
            {...config}
          />
        ))}
        {showMessage(formErrors)}
        <ReCAPTCHA
            sitekey='6LdPTcQUAAAAAEdsP7UXt-M_LSyWP1nyna1rD_Ai'
            onChange={onVerifyCaptcha}
          />
        <Grid
          width={8}
          mobile={16}
          padded='vertically'
          style={{ justifyContent: 'space-evenly' }}
        >
          {resetToggle && handleReset ? (
            <Button disabled={isSubmitting} onClick={handleReset}>
              Voltar
            </Button>
          ) : (
            ''
          )}
          <Button type='submit' disabled={hasError && formErrors === null || !captchaVerified}>
            Enviar
          </Button>
        </Grid>
      </Form>
    </Segment>
  );
};

BasicForm.defaultProps = {
  useCaptcha: false
};

BasicForm.propTypes = {
  title: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  fieldConfig: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string,
      required: PropTypes.bool.isRequired
    })
  ).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleReset: PropTypes.func,
  resetToggle: PropTypes.bool,
  useCaptcha: PropTypes.bool.isRequired,
};

export default BasicForm;