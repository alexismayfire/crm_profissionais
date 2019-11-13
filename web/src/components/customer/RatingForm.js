import React from "react";
import PropTypes from "prop-types";

import { SimpleForm } from '../../components/base/form';

const RatingForm = props => {
  const initialValues = { comment:'' };
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
      onSubmit={()=> {alert('deu')}}
    />
  );
};

RatingForm.propTypes = {
  register: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func
};

export default RatingForm;