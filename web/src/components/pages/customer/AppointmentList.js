import React from 'react';
import PropTypes from "prop-types";
import { appointmentsFetch } from "actions/customer/actions";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class AppointmentList extends React.Component {
  componentDidMount() {
    this.props.appointmentsFetchAction();
  }
  render(){
    if (this.props.appointments.loading) {
      return <p>Carregando...</p>;
    }
    return (
      <div>
        <Link to='/novo-agendamento'> Criar novo </Link>
        <p>Seus agendamentos</p>
        <ul>
          {this.props.appointments.map((appointment, x) => (
            <li key={x}>{appointment.service} agendado para {appointment.start_time}</li>
          ))}
        </ul>
      </div>
    );
  }
}

AppointmentList.propTypes = {
  appointments: PropTypes.array,
  appointmentsFetchAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  appointments: state.customer.appointments
  });
  
  const mapDispatchToProps = {
    appointmentsFetchAction: appointmentsFetch,
  };

  AppointmentList = connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppointmentList);
  
  AppointmentList.displayName = "AppointmentList";

export default AppointmentList;