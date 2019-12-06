import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { customerFetch } from 'actions/worker/actions';

class CustomerList extends React.Component {
  componentDidMount() {
    this.props.customerFetchAction();
  }

  render() {
    /*if (this.props.jobs.loading) {
      return <p>Carregando...</p>;
    }*/
    return (
      <div>
        <ul>
          {this.props.customers.map((customer, x) => (
            <li key={x}>{customer.user.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

CustomerList.propTypes = {
  customers: PropTypes.object,
  customerFetchAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ customers: state.worker.customers });
const mapDispatchToProps = {
  customerFetchAction: customerFetch,
};

CustomerList = connect(mapStateToProps, mapDispatchToProps)(CustomerList);
CustomerList.displayName = 'CustomerList';

export default CustomerList;