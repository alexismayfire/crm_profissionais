import React from "react";
import PropTypes from "prop-types";

import { SimpleForm } from '../../components/base/form';

const ServiceForm = props => {
  const initialValues = { first_name:'', last_name:'' };
  const fields = [
    {
        name: "price",
        type: "text",
        placeholder: "Preço",
        icon: "dollar",
        required: true
    },
    {
        name: "time_spent",
        type: "text",
        icon: "clock",
        placeholder: "Tempo previsto",
        required: true
    },
    {
        name: "category",
        type: "select",
        label: "Categoria",
        required: true,
        options: [
          { key: 1, text: "Manicure", value: "1" },
          { key: 2, text: "Cabeelooo", value: "2" }
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