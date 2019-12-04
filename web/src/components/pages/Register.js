import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { SimpleForm } from 'components/base/form';
import { Grid } from 'components/layout';
import { register, cleanApiErrors } from 'actions/user/actions';

class Register extends React.Component {
  state = { captchaVerified: false };

  registerHandler = (values) => {
    const { email, name, mobile_phone, password1, password2, is_customer } = values;
    this.props.registerAction(name, mobile_phone, email, password1, password2, is_customer);
  };

  onFieldChange = (name) => {
    const { errors } = this.props.user;
    if (errors['non_field_errors'] || errors[name]) {
      this.props.cleanApiErrorsAction();
    }
  };



  render() {
    const initialValues = { name:'', mobile_phone:'', email:'', password1:'', password2:'', is_customer:false };
    const fields = [
        {
            name: "name",
            type: "text",
            icon: "id card",
            placeholder: "Nome",        
            required: true
        },
        {
            name: "email",
            type: "text",
            icon: "user",
            placeholder: "E-Mail",
            required: true
        },
        {
            name: "mobile_phone",
            type: "text",
            icon: "mobile alternate",
            placeholder: "Celular",
            required: true
        },
        {
            name: "password1",
            type: "password",
            icon: "lock",
            placeholder: "Senha",
            required: true,
        },
        {
            name: "password2",
            type: "password",
            icon: "lock",
            placeholder: "Confirme sua Senha",
            required: true,
        },
        {
            name: 'is_customer',
            type: 'select',
            label: 'Tipo de usuário',
            required: true,
            options: [
              { key: 1, text: 'Profissional', value: false },
              { key: 2, text: 'Cliente', value: true },
            ],
        },
    ];

    return (
      <Grid padded centered>
        <Grid.Row>
          <SimpleForm
            title='Registrar'
            initialValues={initialValues}
            fields={fields}
            onSubmit={this.registerHandler}
            apiErrors={this.props.user.errors}
            onFieldChange={this.onFieldChange}
            useCaptcha
          />
        </Grid.Row>
        <Grid.Row>
          <Grid centered columns='one'>
            <Grid.Column textAlign='center'>
              <Link to='/login'>Voltar para tela de Login</Link>
            </Grid.Column>            
          </Grid>
        </Grid.Row>
      </Grid>
    );
  }
}

Register.propTypes = {
  user: PropTypes.object,
  registerAction: PropTypes.any.isRequired
};

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = {
  registerAction: register,
  cleanApiErrorsAction: cleanApiErrors
};

Register = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

Register.displayName = 'RegisterPage';

export default Register;