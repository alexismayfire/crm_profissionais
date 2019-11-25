/* eslint-disable no-template-curly-in-string */
import _ from 'lodash';
import * as Yup from 'yup';

export const generateValidationSchema = fields => {
  const mappedFields = _.mapValues(_.keyBy(fields, 'name'), field => {
    let validation;
    switch (field.type) {
      case 'text':
        let min = null;
        let max = null;
        if (field.validators) {
          min = field.validators.min;
          max = field.validators.max;
        }
        validation = stringValidation(field.name, min, max);
        return field.required
          ? requiredValidation(validation)
          : validation.nullable();
      case 'email':
        validation = emailValidation();
        return field.required
          ? requiredValidation(validation)
          : validation.nullable();
      case 'number':
        validation = numberValidation();
        return field.required
          ? requiredValidation(validation)
          : validation.nullable();
      case 'password':
        validation = stringValidation(field.name);
        return field.required
          ? requiredValidation(validation)
          : validation.nullable();
      default:
        return stringValidation(field.name, null, null);
    }
  });
  return Yup.object().shape(mappedFields);
};

const requiredValidation = validation =>
  validation.required('Esse campo é obrigatório');

const emailValidation = () =>
  Yup.string().email('Por favor, forneça um email válido');

const stringValidation = (fieldName, min, max) => {
  let validation = Yup.string();
  if (min) {
    validation = validation.min(
      min,
      'O ${fieldName} precisa ter pelo menos ${min} caracteres'
    );
  }
  if (max) {
    validation = validation.max(
      max,
      'O ${fieldName} precisa ter mais do que ${max} caracteres'
    );
  }

  return validation;
};

const numberValidation = () =>
  Yup.number()
    .moreThan(-1, 'O número precisa ser 0 ou um valor positivo!')
    .integer('O número precisa ser um inteiro, não decimal!');