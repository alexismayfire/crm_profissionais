import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SimpleForm } from 'components/base/form';
import { portfolioFetch, portfolioUpdate, cleanApiErrors } from 'actions/worker/actions';

class Portfolio extends React.Component {
    componentDidMount(){
        this.props.portfolioFetch();
    }
    portfolioUpdateHandler = (values) => {
        const { about, pics } = values;
        this.props.portfolioUpdate(about, pics);
    };
    onFieldChange = (name) => {
      const { errors } = this.props.worker;
      if (errors['non_field_errors'] || errors[name]) {
        this.props.cleanApiErrorsAction();
      }      
    };
    render(){
        const initialValues = { about: this.props.worker.about, pics: '' };
        const fields = [
            {
                name: 'about',
                type: 'text',
                placeholder: 'Sobre você',
                icon: 'paste',
                required: true
            },
            {
                name: 'pics',
                type: 'file',
                placeholder: 'fotos',
                icon: 'photo',
                required: true
            }
        ];

        return (            
            <SimpleForm
            title='Cadastre seu Portfólio'
            initialValues={initialValues}
            fields={fields}
            onSubmit={this.portfolioUpdateHandler}
            />
        );
    }
}

Portfolio.propTypes = {
  worker: PropTypes.object,
  portfolioUpdate: PropTypes.any.isRequired,
  portfolioFetch: PropTypes.any.isRequired,
};

const mapStateToProps = state => ({ worker: state.worker });
const mapDispatchToProps = {
  portfolioUpdate: portfolioUpdate,
  portfolioFetch: portfolioFetch,
  cleanApiErrorsAction: cleanApiErrors
};

Portfolio = connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);

Portfolio.displayName = "Portfolio";

export default Portfolio;