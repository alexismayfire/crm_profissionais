import React from 'react';
import PropTypes from 'prop-types';

const CapitalizedText = props => (
  <span style={{ textTransform: 'capitalize' }}>{props.text}</span>
);

CapitalizedText.propTypes = {
  text: PropTypes.string.isRequired
};

export default CapitalizedText;