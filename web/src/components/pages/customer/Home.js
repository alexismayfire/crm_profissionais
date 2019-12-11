import React from 'react';
import PropTypes from "prop-types";
import { jobsFetch } from "actions/customer/actions";
import { connect } from "react-redux";
import { SimpleForm } from 'components/base/form';

class CustomerHome extends React.Component {
  componentDidMount() {
    this.props.jobsFetchAction();
  }
  render(){
    if (this.props.jobs.loading) {
      return <p>Carregando...</p>;
    }
    return (
      <div>
        <p>Serviços disponíveis na plataforma</p>
        <ul>
          {this.props.jobs.map((job, x) => (
            <li key={x}>{job.job.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

CustomerHome.propTypes = {
  jobs: PropTypes.array,
  jobsFetchAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  jobs: state.customer.jobs
  });
  
  const mapDispatchToProps = {
    jobsFetchAction: jobsFetch,
  };

  CustomerHome = connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomerHome);
  
  CustomerHome.displayName = "CustomerHome";

export default CustomerHome;