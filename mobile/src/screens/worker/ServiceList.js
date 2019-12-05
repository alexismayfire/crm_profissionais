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
import { jobsFetch } from 'actions/worker/actions';
import { EditList } from 'components/list';

class ServiceList extends React.Component {
  componentDidMount() {
    this.props.jobsFetchAction();
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

    const categoryIconMapping = {
      'NS': 'paint-brush',
      'SC': 'medkit',
      'HR': 'cut',
    };

    return (
      <SafeAreaView style={styles.content}>
        <View>
          <EditList
            items={this.props.jobs.map(job => ({
              id: job.id,
              title: job.job.name,
              icon: categoryIconMapping[job.job.category],
            }))}
            detailScreen="ServiceForm"
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
  jobs: state.worker.jobs,
  categories: state.worker.job_categories,
  loading: state.worker.loading,
});
const mapDispatchToProps = {
  jobsFetchAction: jobsFetch,
};

ServiceList = connect(mapStateToProps, mapDispatchToProps)(ServiceList);

ServiceList.displayName = 'ServiceList';

export default ServiceList;
