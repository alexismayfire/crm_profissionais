import React from "react";
import PropTypes from "prop-types";

import { SimpleForm } from '../../components/base/form';

const ServiceForm = props => {
  const initialValues = { first_name:'', last_name:'' };
  const fields = [
    {
        name: "price",
        type: "text",
        label: "Preço",
        required: true
    },
    {
        name: "time_spent",
        type: "text",
        label: "Tempo previsto",
        required: true
    },
    {
        name: "category",
        type: "select",
        label: "Categoria",
        required: true,
        options: [
          { key: 1, text: "Péssimo", value: "1" },
          { key: 2, text: "Ruim", value: "2" },
          { key: 3, text: "Médio", value: "3" },
          { key: 4, text: "Bom", value: "4" },
          { key: 5, text: "Ótimo", value: "5" }
        ]
    },
  ];

  return (
    <SimpleForm
      initialValues={initialValues}
      fields={fields}
      onSubmit={()=> {alert('deu')}}
    />
  );
};

ServiceForm.propTypes = {
  register: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func
};

export default ServiceForm;