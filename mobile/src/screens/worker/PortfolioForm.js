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
} from 'actions/worker/actions';
import { Button, Message } from 'components/base';
import { SimpleForm } from 'components/form';

class PortfolioForm extends React.Component {
  state = {
    fields: [
      {
        name: 'pictures',
        type: 'image',
        label: 'Imagem',
        placeholder: 'Carregue sua imagem...',
        icon: 'camera',
        required: false,
        array: true,
      },
    ],
  };

  navigateHome = () => {
    this.props.cleanApiErrorsAction();
    this.props.cleanMessagesAction();
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'WorkerHome' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  handleSubmit = (values, formikProps) => {
    const { id } = this.props.worker;
    const data = new FormData();
    const { pictures } = values;
    const photo = pictures[0];
    data.append('photos', [{
      uri: photo.uri,
      type: 'image/jpeg',
      name: 'photo.jpg'
      // data: photo.uri.replace('file://', 'data:image/jpeg;'),
    }]);
    /*
    data.append('labels', [
      'Teste Label 1',
    ]);
    */
    this.props.portfolioCreateAction(data);
    formikProps.setSubmitting(false);
  };

  showMessage = () => {
    if (this.props.message) {
      return <Message content={this.props.message}/>;
    }
  };

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

    initialValues = { pictures: [{}] };

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
            <Button title="Voltar" onPress={this.navigateHome}/>
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
  // workerUpdateAction: PropTypes.func.isRequired,
  cleanApiErrorsAction: PropTypes.func.isRequired,
  cleanMessagesAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  worker: state.user.data.worker,
  loading: state.user.loading,
  message: state.user.message,
  errors: state.user.errors,
});

const mapDispatchToProps = {
  portfolioCreateAction: portfolioCreate,
  cleanApiErrorsAction: cleanApiErrors,
  cleanMessagesAction: cleanMessages,
}

PortfolioForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioForm);

PortfolioForm.displayName = 'PortfolioForm';

export default PortfolioForm;