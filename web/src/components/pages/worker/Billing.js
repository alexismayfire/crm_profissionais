import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { billing } from 'actions/worker/actions';

class Billing extends React.Component {
  componentDidMount() {
    this.props.billingAction();
  }

  render() {
    /*if (this.props.jobs.loading) {
      return <p>Carregando...</p>;
    }*/
    return (
      <div>
          <p>Faturamento:</p>
          <p>{this.props.billingProp}</p>
      </div>
    );
  }
}

Billing.propTypes = {
  billingProp: PropTypes.number,
  billingAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ billingProp: state.worker.billing });
const mapDispatchToProps = {
  billingAction: billing,
};

Billing = connect(mapStateToProps, mapDispatchToProps)(Billing);
Billing.displayName = 'Billing';

export default Billing;