import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Overlay as ElementsOverlay } from 'react-native-elements';

import { Button } from './Button';

const Overlay = props => {
  return (
    <ElementsOverlay
      isVisible={props.isVisible}
      onBackdropPress={props.onPress}
    >
      {props.children}
    </ElementsOverlay>
  );
};

Overlay.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Overlay;
