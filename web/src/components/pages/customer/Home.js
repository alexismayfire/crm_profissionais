import React from 'react';
import PropTypes from "prop-types";
import { CustomerSearch } from "actions/user/actions";
import { connect } from "react-redux";
import { SimpleForm } from 'components/base/form';

class CustomerHome extends React.Component {

    state = { search: "" };

    handleInputChange = (e, { name, value }) => this.setState({ [name]: value });

    searchHandler = () => {
        const { search } = this.state;
        this.props.CustomerSearch(search);        
    };
    render(){
        const { user } = this.props;
        
        const initialValues = { search:'' };
        const fields = [
          {
              name: "search",
              type: "text",
              icon: "search",
              placeholder: "Busca por serviços",
              required: false
          }
        ];
      
        return (
          <div style={{ paddingTop: '2%' }}>
              <SimpleForm
                  initialValues={initialValues}
                  fields={fields}
                  onSubmit={this.searchHandler}
              />
          </div>
        );
    }
}

CustomerHome.propTypes = {
  CustomerSearch: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func
};

const mapStateToProps = state => ({
    user: state.user
  });
  
  const mapDispatchToProps = {
    CustomerSearch
  };

  CustomerHome = connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomerHome);
  
  CustomerHome.displayName = "CustomerHome";

export default CustomerHome;