import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SimpleForm } from 'components/base/form';

import { customerRating, cleanApiErrors } from 'actions/user/actions';

class Rating extends React.Component {

    ratingHandler = (values) => {
        const { rating, comment } = values;
        this.props.customerRatingAction(rating, comment);      
    };
    onFieldChange = (name) => {
      const { errors } = this.props.user;
      if (errors['non_field_errors'] || errors[name]) {
        this.props.cleanApiErrorsAction();
      }
    };
    render(){
        const initialValues = { comment:'' };
        const fields = [
            {
                name: 'rating',
                type: 'select',
                label: 'Nota',
                required: true,
                options: [
                { key: 1, text: 'Péssimo', value: '1' },
                { key: 2, text: 'Ruim', value: '2' },
                { key: 3, text: 'Médio', value: '3' },
                { key: 4, text: 'Bom', value: '4' },
                { key: 5, text: 'Ótimo', value: '5' }
                ]
            },
            {
                name: 'comment',
                type: 'text',
                placeholder: 'Comentário',
                icon: 'comment',
                required: false
            }
        ];

        return (
            <SimpleForm
            title='Avalie o serviço'
            initialValues={initialValues}
            fields={fields}
            onSubmit={this.ratingHandler}
            />
        );
    }
}

Rating.propTypes = {
  user: PropTypes.object,
  customerRatingAction: PropTypes.any.isRequired 
};

const mapStateToProps = state => ({
    user: state.user
  });

  const mapDispatchToProps = {
    customerRatingAction: customerRating,
    cleanApiErrorsAction: cleanApiErrors
  };

  Rating = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Rating);

  Rating.displayName = "CustomerRating";

export default Rating;