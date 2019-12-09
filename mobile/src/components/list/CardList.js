import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Card from './Card';

const CardList = props => (
  <ScrollView contentContainerStyle={styles.container}>
    {props.items.map(item => (
      <Card
        key={item.id}
        id={item.id}
        title={item.title}
        price={item.price}
        content={item.content}
        buttonTitle={props.buttonTitle}
      />
    ))}
  </ScrollView>
);

CardList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      content: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  buttonTitle: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardList;
