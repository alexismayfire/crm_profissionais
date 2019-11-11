import React from "react";
import PropTypes from "prop-types";

import { SimpleForm } from '../../components/base/form';

const SearchForm = props => {
  const initialValues = { search:'' };
  const fields = [
    {
        name: "search",
        type: "text",
        label: "Busca de serviços",
        required: false
    }
  ];

  return (
    <SimpleForm
      initialValues={initialValues}
      fields={fields}
      onSubmit={()=> {alert('deu')}}
    />
  );
};

SearchForm.propTypes = {
  register: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func
};

export default SearchForm;