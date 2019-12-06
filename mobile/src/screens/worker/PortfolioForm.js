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
  workerUpdate,
  cleanApiErrors,
  cleanMessages,
} from 'actions/user/actions';
import { Button, Message } from 'components/base';
import { SimpleForm } from 'components/form';

class PortfolioForm extends React.Component {
  state = {
    fields: [
      {
        name: 'picture',
        type: 'image',
        label: 'Imagem',
        placeholder: 'Carregue sua imagem...',
        icon: 'camera',
        required: true,   
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
    console.log(values);
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

    initialValues = { picture: '' };

    return (
      <SafeAreaView style={styles.container}>
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
  // cleanApiErrorsAction: PropTypes.func.isRequired,
  // cleanMessagesAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  worker: state.user.data.worker,
  loading: state.user.loading,
  message: state.user.message,
  errors: state.user.errors,
});

PortfolioForm = connect(
  mapStateToProps,
  null
)(PortfolioForm);

PortfolioForm.displayName = 'PortfolioForm';

export default PortfolioForm;