import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
// import { Button as ElementsButton } from 'react-native-elements';

import Button from './Button';

const ButtonGroup = props => {
  const { containerSize, verticallyCentered } = props;
  const styles = createStyles(containerSize, verticallyCentered);

  return (
    <View style={styles.container}>
      {props.links.map(({title, screen}, x) => (
        <View
          key={x}
          style={styles.buttonContainer}
        >
          <Button
            title={title}
            onPress={() => props.navigation.navigate(screen)}
            buttonType={props.buttonType}
          />
        </View>
      ))}
    </View>
  );
};

const createStyles = (size, verticallyCentered) => StyleSheet.create({
  container: {
    flex: size,
    flexDirection: 'row',
    alignItems: verticallyCentered ? 'center' : 'flex-start',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 20,
  }
});

ButtonGroup.defaultProps = {
  containerSize: 1,
  containerCentered: true,
  buttonType: 'solid',
};

ButtonGroup.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      screen: PropTypes.string.isRequired,
    })
  ).isRequired,
  containerSize: PropTypes.number,
  containerCentered: PropTypes.bool,
  buttonType: PropTypes.oneOf(
    ['solid', 'clear', 'outline']
  ).isRequired,
};

const LinkGroupNavigation = withNavigation(ButtonGroup);
LinkGroupNavigation.displayName = 'LinkGroup';

export default LinkGroupNavigation;