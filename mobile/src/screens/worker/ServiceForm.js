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
  jobsFetchDetail,
  jobsCreate,
  jobsUpdate,
  cleanApiErrors,
  cleanMessages,
  cleanJob,
} from 'actions/worker/actions';
import { Button, Message } from 'components/base';
import { SimpleForm } from 'components/form';

class ServiceForm extends React.Component {
  state = {
    fields: [
      {
        name: 'name',
        type: 'text',
        placeholder: 'Nome do serviço',
        icon: 'clipboard',
        required: true,
      },
      {
        name: 'price',
        type: 'number',
        placeholder: 'Valor',
        icon: 'cash',
        required: true,
      },
      {
        name: 'time_spent',
        type: 'select',
        label: 'Tempo estimado',
        placeholder: 'Tempo estimado',
        icon: 'alarm',
        required: true,
        options: [
          { key: 1, text: '--- Selecione ---', value: null },
          { key: 2, text: '30 Minutos', value: '00:00:30' },
          { key: 3, text: '1 Hora', value: '00:01:00' },
          { key: 4, text: '1 Hora e 30 Min', value: '00:01:30' },
          { key: 5, text: '2 Horas', value: '00:02:00' },
        ],
      },
      {
        name: 'category',
        type: 'select',
        label: 'Categoria',
        placeholder: 'Categoria',
        icon: 'build',
        required: true,
        options: [
          { key: 1, text: '--- Selecione ---', value: null },
          { key: 2, text: 'Manicure', value: 'NS' },
          { key: 3, text: 'Estética', value: 'SC' },
          { key: 4, text: 'Cabelo', value: 'HR' },
        ],
      },
    ],
  };

  componentDidMount() {
    itemId = this.getNavigationState();
    if (itemId) {
      this.props.jobsFetchDetailAction(itemId);
    } else {
      this.props.cleanJobAction();
    }
  }

  getNavigationState() {
    const { params } = this.props.navigation.state;

    if (params !== undefined && params['itemId']) {
      return params['itemId'];
    }

    return null;
  }

  navigateHome = () => {
    this.props.cleanApiErrorsAction();
    this.props.cleanMessagesAction();
    this.props.cleanJobAction();
    // https://reactnavigation.org/docs/en/stack-actions.html
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'ServiceList' })],
    });
    this.props.navigation.dispatch(resetAction);
  };

  handleSubmit = values => {
    const { name, price, time_spent, category } = values;
    const itemId = this.getNavigationState();
    if (itemId) {
      this.props.jobsUpdateAction(itemId, name, category, price, time_spent);
    } else {
      this.props.jobsCreateAction(name, category, price, time_spent);
    }
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

    itemId = this.getNavigationState();
    let initialValues;

    if (itemId) {
      initialValues = {
        name: this.props.job.job.name,
        price: this.props.job.price,
        time_spent: this.props.job.time_spent,
        category: this.props.job.job.category,
      };
    } else {
      initialValues = {
        name: '',
        price: '',
        time_spent: null,
        category: null,
      };
    }

    return (
      <SafeAreaView style={styles.container}>
        <SimpleForm
          initialValues={initialValues}
          fields={this.state.fields}
          onSubmit={this.handleSubmit}
          apiErrors={this.props.errors}
          cleanApiErrors={this.props.cleanApiErrorsAction}
          containerSize={4}
          containerCentered={false}
        />
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

ServiceForm.propTypes = {
  job: PropTypes.object,
  jobsFetchDetailAction: PropTypes.func.isRequired,
  jobsCreateAction: PropTypes.func.isRequired,
  jobsUpdateAction: PropTypes.func.isRequired,
  cleanApiErrorsAction: PropTypes.func.isRequired,
  cleanMessagesAction: PropTypes.func.isRequired,
  cleanJobAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  job: state.worker.job,
  loading: state.worker.loading,
  errors: state.worker.errors,
  message: state.worker.message,
});

const mapDispatchToProps = {
  jobsFetchDetailAction: jobsFetchDetail,
  jobsCreateAction: jobsCreate,
  jobsUpdateAction: jobsUpdate,
  cleanApiErrorsAction: cleanApiErrors,
  cleanMessagesAction: cleanMessages,
  cleanJobAction: cleanJob,
};

ServiceForm = connect(mapStateToProps, mapDispatchToProps)(ServiceForm);

ServiceForm.displayName = 'ServiceForm';

export default ServiceForm;
