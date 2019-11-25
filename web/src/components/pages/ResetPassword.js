import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SimpleForm } from 'components/base/form';
import { MessageSuccess } from "components/base/messages";
import { Grid } from 'components/layout';
import { resetPassword, cleanApiErrors } from 'actions/user/actions';

class ResetPassword extends React.Component {
  submitHandler = ({ password1, password2 }) => {
    const { key } = this.props.route.match.params;
    const [uid, token] = key.split(/-(.+)/);
    this.props.resetPasswordAction(password1, password2, uid, token);
  };

  onFieldChange = (name) => {
    const { errors } = this.props.user;
    if (errors['non_field_errors'] || errors[name]) {
      this.props.cleanApiErrorsAction();
    }
  };

  showMessage = () => {
    const { user } = this.props;
    if (user.message) {
      return (
        <Grid.Row>
          <MessageSuccess title='Senha alterada com sucesso!'>
            Clique aqui para fazer login.
          </MessageSuccess>
        </Grid.Row>
      );
    }
  };

  render() {
    console.log(this.props.route.match.params['key'].split(/-(.+)/));
    const fields = [
      {
        name: 'password1',
        type: 'password',
        icon: 'lock',
        placeholder: 'Senha',
        required: true
      },
      {
        name: 'password2',
        type: 'password',
        icon: 'lock',
        placeholder: 'Confirme a senha',
        required: true
      }
    ];

    return (
      <Grid padded centered>
        {this.showMessage()}
        <Grid.Row>
          <SimpleForm
            title='Alterar senha'
            initialValues={{ password1: '', password2: ''}}
            fields={fields}
            onSubmit={this.submitHandler}
            apiErrors={this.props.user.errors}
            onFieldChange={this.onFieldChange}
          />
        </Grid.Row>
      </Grid>
    )
  }
}

ResetPassword.propTypes = {
  user: PropTypes.object,
  resetPasswordAction: PropTypes.func.isRequired,
  cleanApiErrorsAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = {
  resetPasswordAction: resetPassword,
  cleanApiErrorsAction: cleanApiErrors
};

ResetPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);

ResetPassword.displayName = 'ResetPassword';

export default ResetPassword;