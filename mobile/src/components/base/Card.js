import React from 'react';
import PropTypes from 'prop-types';
import { Card as ElementsCard } from 'react-native-elements';

import Button from './Button';
import Text from './Text';

const Card = props => (
  <ElementsCard>
    <Text>{props.content}</Text>
    <Button title={props.buttonTitle} onPress={props.buttonAction}/>
  </ElementsCard>
);

Card.propTypes = {
  content: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  buttonAction: PropTypes.func.isRequired,
};

export default Card;