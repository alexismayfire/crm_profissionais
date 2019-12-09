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
import { portfolioFetch } from 'actions/worker/actions';
import { Card, CardSlider, Text } from 'components/base';

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

  componentDidUpdate(prevProps, prevState) {
    const { worker, portfolio } = this.props;

    if (worker.id && !portfolio[0].hasOwnProperty('id')) {
      this.props.portfolioFetchAction();
    }
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

    const { worker, portfolio, navigation } = this.props;
    const images = portfolio.map(image => {
      if (image.hasOwnProperty('photo')) {
        return image.photo;
      }

      return '';
    });

    return (
      <SafeAreaView style={styles.content}>
        <Card
          content={worker.about}
          buttonTitle="Editar"
          buttonAction={() => navigation.navigate('AboutForm')}
        />
        <CardSlider
          content={`Minhas fotos (${portfolio.length} de 6)`}
          images={images}
          buttonTitle="Editar"
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
    ...Containers.createStyles.content(),
  },
  loading: {
    ...Containers.loading,
  },
});

Home.propTypes = {
  workerFetchAction: PropTypes.func.isRequired,
  portfolioFetchAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  storageData: state.user,
  user: state.user.data,
  worker: state.user.data.worker,
  portfolio: state.worker.portfolio,
  loading: state.user.loading || state.worker.loading,
});

const mapDispatchToProps = {
  workerFetchAction: userDetails,
  portfolioFetchAction: portfolioFetch,
};

Home = connect(mapStateToProps, mapDispatchToProps)(Home);

Home.displayName = 'WorkerHome';

export default Home;
