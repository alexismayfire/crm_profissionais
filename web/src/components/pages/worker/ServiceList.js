import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { jobsFetch } from 'actions/worker/actions';

class ServiceList extends React.Component {
  componentDidMount() {
    this.props.jobsFetchAction();
  }

  render() {
    if (this.props.jobs.loading) {
      return <p>Carregando...</p>;
    }
    return (
      <div>
        <Link to="/meus-servicos/novo">Criar Novo</Link>
        <ul>
          {this.props.jobs.map((job, x) => (
            <li key={x}>{job.job.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

ServiceList.propTypes = {
  jobs: PropTypes.object,
  jobsFetchAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ jobs: state.worker.jobs });
const mapDispatchToProps = {
  jobsFetchAction: jobsFetch,
};

ServiceList = connect(mapStateToProps, mapDispatchToProps)(ServiceList);
ServiceList.displayName = 'ServiceList';

export default ServiceList;
