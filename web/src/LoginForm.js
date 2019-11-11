import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment, Divider, GridRow, GridColumn } from 'semantic-ui-react'

const LoginForm = () => (
    <Grid.Column style={{ maxWidth: 450 }} textAlign='center'>
        <Header as='h2' color='teal' textAlign='center'> Log-in to your account</Header>
        <Form size='large'>
            <Segment stacked>

                <Form.Input 
                    fluid icon='user' 
                    iconPosition='left' 
                    placeholder='E-mail'
                    name='email'
                    type='text'
                />
                
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    name='password'
                    type='password'
                />
                <Button color='teal' fluid size='large'>
                    Login
                </Button>
                
                <Link to='/reset_password'> Forgot your password? </Link>

                <Divider horizontal>
                    Or
                </Divider>
                <Header color='grey'>Sign in with your social media account</Header>
                <Grid>
                    <GridRow centered>
                        <GridColumn width={2}>
                            <Button circular color='facebook' icon='facebook f' />
                        </GridColumn>
                        <GridColumn width={2}>
                            <Button circular color='twitter' icon='twitter' />
                        </GridColumn>
                        <GridColumn width={2}>
                            <Button circular color='linkedin' icon='linkedin' />
                        </GridColumn>
                        <GridColumn width={2}>
                            <Button circular color='google plus' icon='google plus' />
                        </GridColumn>                                
                    </GridRow>
                </Grid>

            </Segment>
        </Form>
        <Message>
            New to us? <Link to='/signup'>Sign Up</Link>
        </Message>
    </Grid.Column>
)

export default LoginForm