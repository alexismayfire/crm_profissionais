import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SimpleForm } from 'components/base/form';
import { serviceRegister, cleanApiErrors } from 'actions/worker/actions';

class ServiceRegister extends React.Component {

    serviceRegisterHandler = (values) => {
        const { price, time_spent, name, category } = values;
        this.props.workerServiceRegister(price, time_spent, name, category);
    };
    onFieldChange = (name) => {
      const { errors } = this.props.worker;
      if (errors['non_field_errors'] || errors[name]) {
        this.props.cleanApiErrorsAction();
      }
    };
    render(){
        const initialValues = { name: '', price: '', time_spent: '' };
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
                type: 'number',
                placeholder: 'Tempo estimado',
                icon: 'clock',
                required: true
            },
            {
                name: 'category',
                type: 'select',
                label: 'Categoria',
                required: true,
                options: [
                { key: 1, text: 'Manicure', value: '1' },
                { key: 2, text: 'Estética', value: '2' },
                { key: 3, text: 'Cabelo?', value: '3' }                
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
  workerServiceRegister: PropTypes.any.isRequired 
};

const mapStateToProps = state => ({ worker: state.worker });
const mapDispatchToProps = {
  workerServiceRegister: serviceRegister,
  cleanApiErrorsAction: cleanApiErrors
};

ServiceRegister = connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceRegister);

ServiceRegister.displayName = "ServiceRegister";

export default ServiceRegister;