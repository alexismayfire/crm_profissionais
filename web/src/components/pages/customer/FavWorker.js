import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SimpleForm } from 'components/base/form';
import { workerFetch } from 'actions/customer/actions';

class Fav extends React.Component {
    componentDidMount(){
        this.props.workerFetchAction();
    }

    render(){
        return (
            <div>
              <ul>
                {this.props.fav_workers.map((worker, x) => (
                  <li key={x}>{worker.id}</li>
                ))}
              </ul>
            </div>
        );
    }
}
Fav.propTypes = {
  workers: PropTypes.object,
  fav_workers: PropTypes.object,
  workerFetchAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ workers: state.customer.workers, fav_workers: state.customer.fav_workers });
const mapDispatchToProps = {
  workerFetchAction: workerFetch,
};

Fav = connect(mapStateToProps, mapDispatchToProps)(Fav);
Fav.displayName = 'Fav';

export default Fav;