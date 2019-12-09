import React from 'react';
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Containers } from 'styles';
import { jobsFetch } from 'actions/customer/actions';
import { EditList } from 'components/list';

class ServiceList extends React.Component {
  componentDidMount() {
    this.props.jobsFetchAction();
  }

  render() {
    return (
      <SafeAreaView style={styles.content}>
        {this.props.loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View>
            <EditList
              items={this.props.jobs.map(job => ({
                id: job.id,
                title: job.job.name,
                icon: 'settings',
              }))}
              //detailScreen="ServiceForm"
            />            
          </View>
        )}
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

ServiceList.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      price: PropTypes.string.isRequired,
      time_spent: PropTypes.string.isRequired,
      is_owner: PropTypes.bool.isRequired,
      job: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
      }).isRequired,
      worker: PropTypes.number.isRequired,
    })
  ),
  jobsFetchAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  jobs: state.customer.jobs,
  loading: state.customer.loading,
});
const mapDispatchToProps = {
  jobsFetchAction: jobsFetch,
};

ServiceList = connect(mapStateToProps, mapDispatchToProps)(ServiceList);

ServiceList.displayName = 'ServiceList';

export default ServiceList;
