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
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { Containers } from 'styles';
import { jobsFetch } from 'actions/customer/actions';
import { CardList, EditList, TextList } from 'components/list';

class ServiceList extends React.Component {
  state = {
    activeCategory: 'Todas',
    activeDistanceRange: 'Qualquer',
    location: null,
  };

  componentDidMount() {
    this.props.jobsFetchAction();
    this._getLocationAsync();
  }

  async _getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        text: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    this.setState({ location });
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
      active: category.text === this.state.activeCategory,
      value: category.value,
    }));

    categories.unshift({
      text: 'Todas',
      active: this.state.activeCategory === 'Todas',
      value: 'ALL',
    });

    const distanceRanges = this.props.distanceRanges.map(range => ({
      active: range.text === this.state.activeDistanceRange,
      text: range.text,
    }));

    const timeSpentMapping = {
      '00:00:30': '30 minutos',
      '00:01:00': '1 hora',
      '00:01:30': '1 hora e 30 minutos',
      '00:02:00': '2 horas',
    };

    let filteredJobs = this.props.jobs;
    if (this.state.activeCategory !== 'Todas') {
      const activeCategory = categories.filter(
        category => category.text === this.state.activeCategory
      );
      const { value } = activeCategory[0];
      filteredJobs = this.props.jobs.filter(job => job.job.category === value);
    }

    console.log(this.state.activeDistanceRange);
    if (this.state.activeDistanceRange !== 'Qualquer' && this.state.location) {
      const activeDistanceRange = this.props.distanceRanges.filter(
        range => range.text === this.state.activeDistanceRange
      );
      const { value } = activeDistanceRange[0];
      filteredJobs = this.props.jobs.filter(job => {
        const { latitude: wLat, longitude: wLong } = job.worker;
        const { latitude: lat, longitude: long } = this.state.location.coords;
        const latDiff = lat - parseFloat(wLat);
        const longDiff = long - parseFloat(wLong);
        distance = Math.sqrt(latDiff ** 2 + longDiff ** 2) * 100;
        console.log(job.worker.id, job.job.name, distance, value);
        console.log(distance <= value);
        if (distance <= value) {
          return job;
        }
      });
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
        <View>
          <TextList
            items={categories}
            horizontal
            height={200}
            onItemSelected={item => this.setState({ activeCategory: item })}
          />
          <TextList
            items={distanceRanges}
            horizontal
            height={200}
            onItemSelected={item =>
              this.setState({ activeDistanceRange: item })
            }
          />
          <CardList items={jobs} buttonTitle="Agendar" />
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
      worker: PropTypes.object.isRequired,
    })
  ),
  jobsFetchAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  jobs: state.customer.jobs,
  categories: state.worker.job_categories,
  distanceRanges: state.customer.distanceRanges,
  loading: state.customer.loading,
});
const mapDispatchToProps = {
  jobsFetchAction: jobsFetch,
};

ServiceList = connect(mapStateToProps, mapDispatchToProps)(ServiceList);

ServiceList.displayName = 'ServiceList';

export default ServiceList;
