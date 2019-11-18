import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Divider,
  GridRow,
  GridColumn
} from "semantic-ui-react";

import { login } from "./actions/user/actions";

class LoginForm extends React.Component {
  state = { email: "", password: "" };

  handleInputChange = (e, { name, value }) => this.setState({ [name]: value });

  loginHandler = () => {
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  render() {
    const { user } = this.props;

    return (
      <Grid.Column style={{ maxWidth: 450 }} textAlign="center">
        <Header as="h2" color="teal" textAlign="center">
          {" "}
          Log-in to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail"
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleInputChange}
            />

            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            <Button
              color="teal"
              fluid
              size="large"
              loading={user.loading}
              onClick={this.loginHandler}
            >
              Login
            </Button>

            {user.errors ? (
              <Message negative header="Erro" content={user.errors} />
            ) : (
              ""
            )}

            <Link to="/reset_password"> Forgot your password? </Link>

            <Divider horizontal>Or</Divider>
            <Header color="grey">Sign in with your social media account</Header>
            <Grid>
              <GridRow centered>
                <GridColumn width={2}>
                  <Button circular color="facebook" icon="facebook f" />
                </GridColumn>
                <GridColumn width={2}>
                  <Button circular color="twitter" icon="twitter" />
                </GridColumn>
                <GridColumn width={2}>
                  <Button circular color="linkedin" icon="linkedin" />
                </GridColumn>
                <GridColumn width={2}>
                  <Button circular color="google plus" icon="google plus" />
                </GridColumn>
              </GridRow>
            </Grid>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/signup">Sign Up</Link>
        </Message>
      </Grid.Column>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  login
};

LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

LoginForm.displayName = "LoginForm";

export default LoginForm;
