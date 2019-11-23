import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Button, Form, Header, Segment } from 'semantic-ui-react';

import { Grid } from 'components/layout';
import FormField from './FormField';
import AnimatedErrorMessage from "./AnimatedErrorMessage";

const BasicForm = props => {
  const { isSubmitting, handleSubmit, hasError, fieldConfig, title } = props;
  const { formErrors, onFieldChange, handleReset, resetToggle } = props;

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
            formErrors={formErrors}
            {...config}
          />
        ))}
        {formErrors && <AnimatedErrorMessage
          touched
          hasError={hasError}
          error={formErrors}
        />}
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
          <Button type='submit' disabled={hasError && formErrors === null}>
            Enviar
          </Button>
        </Grid>
      </Form>
    </Segment>
  )
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
  resetToggle: PropTypes.bool
};

export default BasicForm;