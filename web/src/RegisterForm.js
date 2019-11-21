import React from "react";
import PropTypes from "prop-types";
import { register } from "./actions/user/actions";
import { connect } from "react-redux";
import { SimpleForm } from './components/base/form';

class RegisterForm extends React.Component{
    state = { first_name:"", last_name:"", mobile_phone:"", email:"", password:"", password_confirm:"" };

    handleInputChange = (e, { name, value }) => this.setState({ [name]: value });
  
    registerHandler = () => {
      const { first_name, last_name, mobile_phone, email, password, password_confirm } = this.state;
      this.props.register(first_name, last_name, mobile_phone, email, password, password_confirm);
    };

    render(){
        const initialValues = { first_name:'', last_name:'', mobile_phone:'', email:'', password:'', password_confirm:'' };
        const fields = [
            {
                name: "first_name",
                type: "text",
                icon: "id card",
                placeholder: "Nome",        
                required: true
            },
            {
                name: "last_name",
                type: "text",
                icon: "id card",
                placeholder: "Sobrenome",
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
                name: "password",
                type: "password",
                icon: "lock",
                placeholder: "Senha",
                required: true,
            },
            {
                name: "password_confirm",
                type: "password",
                icon: "lock",
                placeholder: "Confirme sua Senha",
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
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = {
    register
};
RegisterForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterForm);

RegisterForm.displayName = "RegisterForm";

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