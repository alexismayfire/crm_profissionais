import React from 'react';
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Containers } from 'styles';
import { jobsFetch } from 'actions/customer/actions';
import { CardList, EditList, TextList } from 'components/list';

class ServiceList extends React.Component {
  state = { active: 'Todas' };

  componentDidMount() {
    this.props.jobsFetchAction();
  }

  render() {
    if (this.props.loading) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        </SafeAreaView>
      );
    }

    const categories = this.props.categories.map(category => ({
      text: category.text,
      active: category.text === this.state.active,
      value: category.value,
    }));

    categories.unshift({
      text: 'Todas',
      active: this.state.active === 'Todas',
      value: 'ALL',
    });

    const timeSpentMapping = {
      '00:00:30': '30 minutos',
      '00:01:00': '1 hora',
      '00:01:30': '1 hora e 30 minutos',
      '00:02:00': '2 horas',
    };

    let filteredJobs = this.props.jobs;
    if (this.state.active !== 'Todas') {
      const activeCategory = categories.filter(
        category => category.text === this.state.active
      );
      const { value } = activeCategory[0];
      filteredJobs = this.props.jobs.filter(job => job.job.category === value);
    }

    const jobs = filteredJobs.map(job => ({
      id: job.id,
      title: job.job.name,
      price: job.price,
      content: [
        `Duração: ${timeSpentMapping[job.time_spent]}`,
        `${job.worker.about}`,
      ],
    }));

    return (
      <SafeAreaView style={styles.content}>
        {this.props.loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View>
            <TextList
              items={categories}
              horizontal
              height={200}
              onItemSelected={item => this.setState({ active: item })}
            />
            <CardList items={jobs} buttonTitle="Agendar" />
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
      worker: PropTypes.object.isRequired,
    })
  ),
  jobsFetchAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  jobs: state.customer.jobs,
  categories: state.worker.job_categories,
  loading: state.customer.loading,
});
const mapDispatchToProps = {
  jobsFetchAction: jobsFetch,
};

ServiceList = connect(mapStateToProps, mapDispatchToProps)(ServiceList);

ServiceList.displayName = 'ServiceList';

export default ServiceList;
