import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Card as ElementsCard } from 'react-native-elements';

import { Containers, Spacing } from 'styles';
import Button from './Button';
import Text from './Text';

const renderImages = images => {
  return images.map((image, x) => {
    if (image) {
      return (
        <Image key={x} source={{ uri: image }} style={styles.imageContainer} />
      );
    }
  });
};

const CardSlider = props => (
  <ElementsCard>
    <Text>{props.content}</Text>
    <ScrollView horizontal>{renderImages(props.images)}</ScrollView>
    <Button title={props.buttonTitle} onPress={props.buttonAction} />
  </ElementsCard>
);

const styles = StyleSheet.create({
  imageContainer: {
    ...Containers.createStyles.image,
    ...Spacing.mediumMargin,
    width: 200,
    height: 200,
  },
});

CardSlider.propTypes = {
  content: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  buttonAction: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CardSlider;
