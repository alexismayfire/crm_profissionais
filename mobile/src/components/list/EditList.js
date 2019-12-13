import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { ListItem } from 'react-native-elements';

const EditList = props => {
  const { items, navigation, detailScreen } = props;

  return items.map((item, x) => (
    <ListItem
      key={x}
      title={item.title}
      leftIcon={{ name: item.icon, type: 'font-awesome' }}
      bottomDivider
      chevron
      onPress={() =>
        detailScreen === ''
          ? alert('Em construção!')
          : navigation.navigate(detailScreen, { itemId: item.id })
      }
    />
  ));
};

EditList.defaultProps = {
  detailScreen: '',
};

EditList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
  detailScreen: PropTypes.string.isRequired,
};

EditList.displayName = 'EditList';

export default withNavigation(EditList);
