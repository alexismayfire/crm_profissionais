import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
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
} from 'actions/worker/actions';
import { Button, Message } from 'components/base';
import { ImagePicker, SimpleForm } from 'components/form';

class PortfolioForm extends React.Component {
  state = {
    fields: [
      {
        name: 'photos',
        type: 'image',
        label: 'Imagem',
        placeholder: 'Carregue sua imagem...',
        icon: 'camera',
        required: false,
        array: true,
      },
    ],
  };

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

  handleSubmit = (values, formikProps) => {
    /*
    const { id } = this.props.worker;
    const data = new FormData();
    const { pictures } = values;

    const photo = pictures[0];
    const uriParts = photo.uri.split('.');
    const extension = uriParts[uriParts.length - 1];
    data.append('photo', {
      uri: photo.uri,
      type: `image/${extension}`,
      name: `${uuid()}.${extension}`,
    });
    data.append('worker', id);
    */
    this.props.portfolioCreateAction(values);
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

    initialValues = { photos: this.props.portfolio };

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <SimpleForm
            initialValues={initialValues}
            fields={this.state.fields}
            onSubmit={this.handleSubmit}
            apiErrors={this.props.errors}
            cleanApiErrors={this.props.cleanApiErrorsAction}
            containerSize={2}
            containerCentered={false}
          />
          <View style={styles.messageContainer}>{this.showMessage()}</View>
          <View style={styles.buttonContainer}>
            <Button title="Voltar" onPress={this.navigateHome} />
          </View>
        </ScrollView>
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
  cleanApiErrorsAction: cleanApiErrors,
  cleanMessagesAction: cleanMessages,
};

PortfolioForm = connect(mapStateToProps, mapDispatchToProps)(PortfolioForm);

PortfolioForm.displayName = 'PortfolioForm';

export default PortfolioForm;
