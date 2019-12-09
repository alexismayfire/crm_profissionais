import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';

import { Containers } from 'styles';
import {
  cleanApiErrors,
  cleanMessages,
  portfolioCreate,
  portfolioFetch,
  portfolioUpdate,
  portfolioDelete,
} from 'actions/worker/actions';
import { Button, Message } from 'components/base';
import { ImagePicker, SimpleForm } from 'components/form';

class PortfolioForm extends React.Component {
  componentDidMount() {
    this.props.portfolioFetchAction();
  }

  navigateHome = () => {
    this.props.cleanApiErrorsAction();
    this.props.cleanMessagesAction();
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'WorkerHome' })],
    });
    this.props.navigation.dispatch(resetAction);
  };

  handleUpload = (photo, id = null) => {
    this.props.cleanApiErrorsAction();
    this.props.cleanMessagesAction();
    if (id) {
      this.props.portfolioUpdateAction(photo, id);
    } else {
      this.props.portfolioCreateAction(photo);
    }
  };

  handleDelete = id => {
    this.props.cleanApiErrorsAction();
    this.props.cleanMessagesAction();
    this.props.portfolioDeleteAction(id);
  };

  showMessage = () => {
    if (this.props.message) {
      return <Message content={this.props.message} />;
    }
  };

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

    const { portfolio } = this.props;
    const images = [...portfolio];
    const { length } = images;
    if (length < 6 && images[length - 1].photo) {
      images.push({ photo: null, id: null });
    }

    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {images.map((image, index) => (
            <ImagePicker
              key={index}
              index={index}
              photoUrl={image.photo}
              photoId={image.id}
              onChange={this.handleUpload}
              onDelete={this.handleDelete}
            />
          ))}
        </View>
        <View style={styles.messageContainer}>{this.showMessage()}</View>
        <View style={styles.buttonContainer}>
          <Button title="Voltar" onPress={this.navigateHome} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Containers.createStyles.screen(),
  },
  messageContainer: {
    flex: 1,
  },
  loading: {
    ...Containers.loading,
  },
});

PortfolioForm.propTypes = {
  worker: PropTypes.object,
  errors: PropTypes.object,
  cleanApiErrorsAction: PropTypes.func.isRequired,
  cleanMessagesAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  worker: state.user.data.worker,
  portfolio: state.worker.portfolio,
  loading: state.worker.loading,
  message: state.worker.message,
  errors: state.worker.errors,
});

const mapDispatchToProps = {
  portfolioCreateAction: portfolioCreate,
  portfolioFetchAction: portfolioFetch,
  portfolioUpdateAction: portfolioUpdate,
  portfolioDeleteAction: portfolioDelete,
  cleanApiErrorsAction: cleanApiErrors,
  cleanMessagesAction: cleanMessages,
};

PortfolioForm = connect(mapStateToProps, mapDispatchToProps)(PortfolioForm);

PortfolioForm.displayName = 'PortfolioForm';

export default PortfolioForm;
