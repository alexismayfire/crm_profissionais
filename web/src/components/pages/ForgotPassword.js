import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SimpleForm } from 'components/base/form';
import { MessageSuccess } from 'components/base/messages';
import { Grid } from 'components/layout';
import { forgotPassword, cleanApiErrors } from 'actions/user/actions';

class ForgotPassword extends React.Component {
  submitHandler = ({ email }) => {
    this.props.forgotPasswordAction(email);
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
          <MessageSuccess title='Verifique sua caixa de entrada!'>
            {user.message}
          </MessageSuccess>
        </Grid.Row>
      );
    }
  };

  render() {
    const fields = [
      {
        name: 'email',
        type: 'text',
        icon: 'user',
        placeHolder: 'Email',
        required: true
      }
    ];

    return (
      <Grid padded centered>
        {this.showMessage()}
        <Grid.Row>
          <SimpleForm
            title='Esqueci a senha'
            initialValues={{ email: '' }}
            fields={fields}
            onSubmit={this.submitHandler}
            onFieldChange={this.onFieldChange}
            apiErrors={this.props.user.errors}
          />
        </Grid.Row>
      </Grid>
    )
  }
}

ForgotPassword.propTypes = {
  user: PropTypes.object,
  forgotPasswordAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = {
  forgotPasswordAction: forgotPassword,
  cleanApiErrorsAction: cleanApiErrors
};

ForgotPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);

ForgotPassword.displayName = 'ForgotPassword';

export default ForgotPassword;