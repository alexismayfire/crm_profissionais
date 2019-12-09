import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SimpleForm } from 'components/base/form';
import { Grid } from 'components/layout';
import { login, cleanApiErrors } from 'actions/user/actions';

class Login extends React.Component {
  state = { captchaVerified: false };

  loginHandler = values => {
    const { email, password } = values;
    this.props.loginAction(email, password);
  };

  twoFactorHandler = values => {
    alert(values.code);
  };

  onFieldChange = name => {
    const { errors } = this.props.user;
    if (errors['non_field_errors'] || errors[name]) {
      this.props.cleanApiErrorsAction();
    }
  };

  renderTwoFactorInput() {
    if (this.props.user.twoFactor) {
      return <input name="token" />;
    }
  }

  render() {
    const fields = [
      {
        name: 'email',
        type: 'text',
        icon: 'user',
        placeholder: 'Email',
        required: true,
      },
      {
        name: 'password',
        type: 'password',
        icon: 'lock',
        placeholder: 'Senha',
        required: true,
      },
    ];

    const fieldsTwoFactor = [
      {
        name: 'code',
        type: 'text',
        icon: 'lock',
        placeholder: 'Código',
        required: true,
      },
    ];

    if (this.props.user.twoFactor) {
      return (
        <Grid padded centered>
          <Grid.Row>
            <SimpleForm
              title="Confirmação de dois fatores"
              initialValues={{ code: '' }}
              fields={fieldsTwoFactor}
              onSubmit={this.twoFactorHandler}
              apiErrors={this.props.user.errors}
              onFieldChange={this.onFieldChange}
            />
          </Grid.Row>
        </Grid>
      );
    }

    return (
      <Grid padded centered>
        <Grid.Row>
          <SimpleForm
            title="Entrar"
            initialValues={{ email: '', password: '' }}
            fields={fields}
            onSubmit={this.loginHandler}
            apiErrors={this.props.user.errors}
            onFieldChange={this.onFieldChange}
            useCaptcha
          />
        </Grid.Row>
        {this.renderTwoFactorInput()}
        <Grid.Row>
          <Grid centered columns="two" divided>
            <Grid.Column textAlign="center">
              <a href="/forgot-password">Esqueceu sua senha?</a>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <a href="/signup">Ainda não possui registro?</a>
            </Grid.Column>
          </Grid>
        </Grid.Row>
      </Grid>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object,
  loginAction: PropTypes.any.isRequired,
};

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = {
  loginAction: login,
  cleanApiErrorsAction: cleanApiErrors,
};

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

Login.displayName = 'LoginPage';

export default Login;
