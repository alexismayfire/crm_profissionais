import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';

const Error = props => (
  <Text style={{ textAlign: 'center' }}>{props.error}</Text>
);

Error.propTypes = {
  error: PropTypes.string.isRequired,
};

export default Error;