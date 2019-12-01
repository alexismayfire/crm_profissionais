import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SimpleForm } from 'components/base/form';
import { portfolioRegister, cleanApiErrors } from 'actions/worker/actions';

class Portfolio extends React.Component {

    portfolioRegisterHandler = (values) => {
        const { about, pics, category } = values;
        this.props.portfolioRegister(about, pics, category);
    };
    onFieldChange = (name) => {
      const { errors } = this.props.worker;
      if (errors['non_field_errors'] || errors[name]) {
        this.props.cleanApiErrorsAction();
      }      
    };
    render(){
        const initialValues = { about: '', pics: '', category: 'HR' };
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
                type: 'number',
                placeholder: 'fotos',
                icon: 'dollar',
                required: true
            },
            {
                name: 'category',
                type: 'select',
                label: 'Categoria',
                required: true,
                options: [
                { key: 1, text: 'Manicure', value: 'NS' },
                { key: 2, text: 'Estética', value: 'SC' },
                { key: 3, text: 'Cabelo', value: 'HR' }                
                ]
            }
        ];

        return (            
            <SimpleForm
            title='Cadastre seu Portfólio'
            initialValues={initialValues}
            fields={fields}
            onSubmit={this.portfolioRegisterHandler}
            />
        );
    }
}

Portfolio.propTypes = {
  worker: PropTypes.object,
  portfolioRegister: PropTypes.any.isRequired 
};

const mapStateToProps = state => ({ worker: state.worker });
const mapDispatchToProps = {
  portfolioRegister: portfolioRegister,
  cleanApiErrorsAction: cleanApiErrors
};

Portfolio = connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);

Portfolio.displayName = "Portfolio";

export default Portfolio;