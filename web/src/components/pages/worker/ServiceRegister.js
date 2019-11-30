import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SimpleForm } from 'components/base/form';
import { jobRegister, cleanApiErrors } from 'actions/worker/actions';

class ServiceRegister extends React.Component {

    serviceRegisterHandler = (values) => {
        const { price, time_spent, name, category } = values;
        this.props.workerJobRegister(price, time_spent, name, category);
    };
    onFieldChange = (name) => {
      const { errors } = this.props.worker;
      if (errors['non_field_errors'] || errors[name]) {
        this.props.cleanApiErrorsAction();
      }      
    };
    render(){
        const initialValues = { name: '', price: '', time_spent: 30, category: 'HR' };
        const fields = [
            {
                name: 'name',
                type: 'text',
                placeholder: 'Nome do serviço',
                icon: 'paste',
                required: true
            },
            {
                name: 'price',
                type: 'number',
                placeholder: 'Valor',
                icon: 'dollar',
                required: true
            },
            {
                name: 'time_spent',
                type: 'select',
                label: 'Tempo estimado',                
                required: true,
                options: [
                  { key: 1, text: '30 Minutos', value: 30 },
                  { key: 2, text: '1 Hora', value: 60 },
                  { key: 3, text: '2 Horas', value: 120 }
                ]
            },
            {
                name: 'category',
                type: 'select',
                label: 'Categoria',
                required: true,
                options: [
                { key: 1, text: 'Manicure', value: 'NS' },
                { key: 2, text: 'Estética', value: 'SC' },
                { key: 3, text: 'Cabelo', value: 'HR' }                
                ]
            }
        ];

        return (            
            <SimpleForm
            title='Cadastre um serviço'
            initialValues={initialValues}
            fields={fields}
            onSubmit={this.serviceRegisterHandler}
            />
        );
    }
}

ServiceRegister.propTypes = {
  worker: PropTypes.object,
  workerJobRegister: PropTypes.any.isRequired 
};

const mapStateToProps = state => ({ worker: state.worker });
const mapDispatchToProps = {
  workerJobRegister: jobRegister,
  cleanApiErrorsAction: cleanApiErrors
};

ServiceRegister = connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceRegister);

ServiceRegister.displayName = "ServiceRegister";

export default ServiceRegister;