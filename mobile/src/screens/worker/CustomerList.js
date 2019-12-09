import React from 'react';
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Containers } from 'styles';
import { customersFetch } from 'actions/worker/actions';
import { EditList } from 'components/list';

class CustomerList extends React.Component {
  componentDidMount() {
    this.props.customersFetchAction();
  }

  render() {
    if (this.props.loading) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.loading}>
            <ActivityIndicator size="large"/>
          </View>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.content}>
        <View>
          <EditList
            items={this.props.customers.map((customer, x) => ({
              id: x,
              title: customer.user.name,
              icon: 'user',
            }))}
            //detailScreen="ServiceForm"
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Containers.createStyles.screen(),
  },
  content: {
    ...Containers.createStyles.content(),
  },
  loading: {
    ...Containers.loading,
  },
});

CustomerList.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        worker: PropTypes.object,
      }).isRequired,
    })
  ),
  customersFetchAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  customers: state.worker.customers,  
  loading: state.worker.loading,
});
const mapDispatchToProps = {
  customersFetchAction: customersFetch,
};

CustomerList = connect(mapStateToProps, mapDispatchToProps)(CustomerList);

CustomerList.displayName = 'CustomerList';

export default CustomerList;
