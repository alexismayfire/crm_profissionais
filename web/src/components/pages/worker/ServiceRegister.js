import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SimpleForm } from 'components/base/form';
import { jobRegister, cleanApiErrors } from 'actions/worker/actions';

class ServiceRegister extends React.Component {
  serviceRegisterHandler = values => {
    const { name, category, price, time_spent } = values;
    this.props.workerJobRegister(name, category, price, time_spent);
  };

  onFieldChange = name => {
    const { errors } = this.props.worker;
    if (errors['non_field_errors'] || errors[name]) {
      this.props.cleanApiErrorsAction();
    }
  };

  render() {
    const initialValues = {
      name: '',
      price: '',
      time_spent: '',
      category: '',
    };

    const fields = [
      {
        name: 'name',
        type: 'text',
        placeholder: 'Nome do serviço',
        icon: 'paste',
        required: true,
      },
      {
        name: 'price',
        type: 'number',
        placeholder: 'Valor',
        icon: 'dollar',
        required: true,
      },
      {
        name: 'time_spent',
        type: 'select',
        label: 'Tempo estimado',
        required: true,
        options: [
          { key: 1, text: '', value: '' },
          { key: 2, text: '30 Minutos', value: '30' },
          { key: 3, text: '1 Hora', value: '60' },
          { key: 4, text: '1 Hora e 30 Min', value: '90' },
          { key: 5, text: '2 Horas', value: '120' },
        ],
      },
      {
        name: 'category',
        type: 'select',
        label: 'Categoria',
        required: true,
        options: [
          { key: 1, text: '', value: '' },
          { key: 2, text: 'Manicure', value: 'NS' },
          { key: 3, text: 'Estética', value: 'SC' },
          { key: 4, text: 'Cabelo', value: 'HR' },
        ],
      },
    ];

    return (
      <SimpleForm
        title="Cadastre um serviço"
        initialValues={initialValues}
        fields={fields}
        onSubmit={this.serviceRegisterHandler}
        onFieldChange={this.onFieldChange}
        apiErrors={this.props.worker.errors}
      />
    );
  }
}

ServiceRegister.propTypes = {
  worker: PropTypes.object,
  workerJobRegister: PropTypes.any.isRequired,
};

const mapStateToProps = state => ({ worker: state.worker });
const mapDispatchToProps = {
  workerJobRegister: jobRegister,
  cleanApiErrorsAction: cleanApiErrors,
};

ServiceRegister = connect(mapStateToProps, mapDispatchToProps)(ServiceRegister);

ServiceRegister.displayName = 'ServiceRegister';

export default ServiceRegister;
