import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

const LoginForm = () => (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='blue' textAlign='center'> Log-in to your account</Header>
            <Form size='large'>
                <Segment stacked>

                    <Form.Input 
                        fluid icon='user' 
                        iconPosition='left' 
                        placeholder='E-mail'
                        type='text'
                    />
                    
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                    />

                    <Button color='blue' fluid size='large'>
                        Login
                    </Button>

                    <div className="ui horizontal divider">
                        Or
                    </div>

                    <Button color='teal' fluid size='large'>
                        <i class="facebook f icon"></i>
                        Login with Facebook
                    </Button>

                </Segment>
            </Form>
            <Message>
                New to us? <a href='#'>Sign Up</a>
            </Message>
        </Grid.Column>
    </Grid>
)

export default LoginForm