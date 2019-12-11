import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SimpleForm } from 'components/base/form';
import { appointmentsRegister, workerFetch, cleanApiErrors } from 'actions/customer/actions';

class AppointmentRegister extends React.Component {
  componentDidMount() {
    //this.props.jobsFetchAction();
  }
  appointmentRegisterHandler = values => {
    const { worker, service, start_time } = values;
    this.props.customerAppointmentRegister(worker, service, start_time);
  };

  onFieldChange = name => {
    const { errors } = this.props.worker;
    if (errors['non_field_errors'] || errors[name]) {
      this.props.cleanApiErrorsAction();
    }
  };

  render() {
    const initialValues = {
      worker: '',
      service: '',
      start_time: '18/11/2019 10:00',      
    };

    const fields = [
      {
        name: 'worker',
        type: 'select',
        label: 'Profissional',
        required: true,
        options: [
        { key: 1, text: 'Rodrigo', value: 1 },
        { key: 2, text: 'Karl', value: 19 },
        ]
      },      
      {
        name: 'service',
        type: 'select',
        label: 'Serviço',
        required: true,
        options: [
        { key: 1, text: 'Corte', value: 1 },
        { key: 2, text: 'Corte Comun', value: 2 },
        ]
      },
      {
        name: 'start_time',
        type: 'datetime-local',
        placeholder: 'Data e Hora',
        icon: 'clock',
        required: true,
      },
    ];

    return (
      <SimpleForm
        title="Cadastre um serviço"
        initialValues={initialValues}
        fields={fields}
        onSubmit={this.appointmentRegisterHandler}
        onFieldChange={this.onFieldChange}
        apiErrors={this.props.customer.errors}
      />
    );
  }
}

AppointmentRegister.propTypes = {
  customer: PropTypes.object,
  customerAppointmentRegister: PropTypes.any.isRequired,
};

const mapStateToProps = state => ({ customer: state.customer });
const mapDispatchToProps = {
    customerAppointmentRegister: appointmentsRegister,
  cleanApiErrorsAction: cleanApiErrors,
};

AppointmentRegister = connect(mapStateToProps, mapDispatchToProps)(AppointmentRegister);

AppointmentRegister.displayName = 'AppointmentRegister';

export default AppointmentRegister;
