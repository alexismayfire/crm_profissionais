import React from "react";
import PropTypes from "prop-types";
import { CustomerRating } from "actions/user/actions";
import { connect } from "react-redux";
import { SimpleForm } from "components/base/form";

class Rating extends React.Component {
    state = { search: "", rating: "" };

    handleInputChange = (e, { name, value }) => this.setState({ [name]: value });

    ratingHandler = () => {
        const { rating, comment } = this.state;
        this.props.CustomerRating(rating, comment);      
    };
    render(){
        const initialValues = { comment:"" };
        const fields = [
            {
                name: "rating",
                type: "select",
                label: "Nota",
                required: true,
                options: [
                { key: 1, text: "Péssimo", value: "1" },
                { key: 2, text: "Ruim", value: "2" },
                { key: 3, text: "Médio", value: "3" },
                { key: 4, text: "Bom", value: "4" },
                { key: 5, text: "Ótimo", value: "5" }
                ]
            },
            {
                name: "comment",
                type: "text",
                placeholder: "Comentário",
                icon: "comment",
                required: false
            }
        ];

        return (
            <SimpleForm
            initialValues={initialValues}
            fields={fields}
            onSubmit={this.ratingHandler}
            />
        );
    }
}

Rating.propTypes = {
  rating: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func
};

const mapStateToProps = state => ({
    user: state.user
  });

  const mapDispatchToProps = {
    CustomerRating
  };

  Rating = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Rating);

  Rating.displayName = "CustomerRating";

export default Rating;