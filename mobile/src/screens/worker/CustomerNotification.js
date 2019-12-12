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
} from 'actions/user/actions';
import { customerNotificationUpdate } from 'actions/worker/actions';
import { Button, Message } from 'components/base';
import { SimpleForm } from 'components/form';

class CustomerNotification extends React.Component {
  state = {
    fields: [
      {
        name: 'rating_message',
        type: 'textarea',
        placeholder: 'Mensagem para os clientes avaliarem seu atendimento',
        icon: 'clipboard',
        required: true,
      },
      {
        name: 'customer_message',
        type: 'textarea',
        placeholder: 'Mensagem para clientes que não agendam há muito tempo',
        icon: 'clipboard',
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

  handleSubmit = values => {
    const{ rating_message, customer_message } = values;
    this.props.workerUpdateAction(rating_message, customer_message);
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
            <ActivityIndicator size="large"/>
          </View>
        </SafeAreaView>
      );
    }

    initialValues = { rating_message: this.props.worker.customMessage.ratingMessage, customer_message: this.props.worker.customMessage.customerMessage };
    
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

CustomerNotification.propTypes = {
  worker: PropTypes.object,
  errors: PropTypes.object,
  workerUpdateAction: PropTypes.func.isRequired,
  cleanApiErrorsAction: PropTypes.func.isRequired,
  cleanMessagesAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  worker: state.worker,
  loading: state.user.loading,
  message: state.user.message,
  errors: state.user.errors,
});

const mapDispatchToProps = {
  workerUpdateAction: customerNotificationUpdate,
  cleanApiErrorsAction: cleanApiErrors,
  cleanMessagesAction: cleanMessages,
};

CustomerNotification = connect(
  mapStateToProps, 
  mapDispatchToProps
)(CustomerNotification);

CustomerNotification.displayName = 'CustomerNotification';

export default CustomerNotification;
