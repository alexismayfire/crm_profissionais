import React from "react";
import PropTypes from "prop-types";

import { SimpleForm } from '../../components/base/form';

const RegisterForm = props => {
  //const { onSubmit } = props;
  //const { name, email, password, password_confirm } = register;
  const initialValues = { name:'', email:'', password:'', password_confirm:'' };
  const fields = [
    {
      name: "name",
      type: "text",
      label: "Nome Completo",
      required: true
    },
    {
      name: "email",
      type: "text",
      label: "E-Mail",
      required: true
    },
    {
      name: "password",
      type: "text",
      label: "Senha",
      required: true,
    },
    {
        name: "password_confirm",
        type: "text",
        label: "Confirme sua Senha",
        required: true,
      }
  ];

  return (
    <SimpleForm
      initialValues={initialValues}
      fields={fields}
      onSubmit={()=> {alert('deu')}}
    />
  );
};

RegisterForm.propTypes = {
  register: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func
};

export default RegisterForm;

/*const RegisterForm = () => (
    <Grid.Column style={{ maxWidth: 450 }}>            
        <Header as='h2' color='teal' textAlign='center'> Sign up and enjoy! </Header>
        <Form size='large'>
            <Segment stacked>
                <FormField>
                    <Grid>
                        <GridRow centered>
                            <GridColumn width={4}>
                                <Radio
                                    label='Profissional'
                                    name='userGroup'
                                    value='Profissional'
                                />
                            </GridColumn>
                            <GridColumn width={4}>
                                <Radio
                                    label='Cliente'
                                    name='userGroup'
                                    value='Cliente'
                                />
                            </GridColumn>
                        </GridRow>
                    </Grid>
                </FormField>
                <Form.Input 
                    fluid icon='id card' 
                    iconPosition='left' 
                    placeholder='Nome completo'
                    type='text'
                />

                <Form.Input 
                    fluid icon='user' 
                    iconPosition='left' 
                    placeholder='E-mail'
                    type='text'
                />
                
                <Form.Input 
                    fluid icon='mobile alternate' 
                    iconPosition='left' 
                    placeholder='Celular'
                    type='text'
                />

                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Senha'
                    type='password'
                />

                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Confirma Senha'
                    type='password'
                />

                <Button color='teal'>
                    Cadastrar
                </Button>
                <Button color='grey' as={Link} to='login'>
                    Voltar
                </Button>
            </Segment>
        </Form>
    </Grid.Column>
)

export default RegisterForm*/