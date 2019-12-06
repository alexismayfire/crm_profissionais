import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Containers } from 'styles';
import { userDetails } from 'actions/user/actions';
import { Card, Text } from 'components/base';

class Home extends React.Component {
  async componentDidMount() {
    this.props.workerFetchAction();

    const authStorage = AsyncStorage.getItem('authDetails');
    if (!authStorage) {
      const authDetails = {
        token: this.props.storageData.token,
        isCustomer: false,
      };

      await AsyncStorage.setItem('authDetails', JSON.stringify(authDetails));
    }
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

    const { worker, navigation } = this.props;

    return (
      <SafeAreaView style={styles.content}>
        <Card 
          content={worker.about} 
          buttonTitle='Editar' 
          buttonAction={() => navigation.navigate('AboutForm')}
        />
        <Card
          content='Minhas fotos'
          buttonTitle='Editar'
          buttonAction={() => navigation.navigate('PortfolioForm')} 
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Containers.createStyles.screen(),
  },
  content: {
    ...Containers.createStyles.content()
  },
  loading: {
    ...Containers.loading,
  },
});

Home.propTypes = {
  workerFetchAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  storageData: state.user,
  user: state.user.data,
  worker: state.user.data.worker,
  loading: state.user.loading,
});

const mapDispatchToProps = {
  workerFetchAction: userDetails,
};

Home = connect(
  mapStateToProps, 
  mapDispatchToProps
)(Home);

Home.displayName = 'WorkerHome';

export default Home;