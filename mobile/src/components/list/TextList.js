import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextList = props => (
  <Container
    horizontal={props.horizontal}
    showsHorizontalScrollIndicator={props.scrollIndicator}
    showsVerticalScrollIndicator={props.scrollIndicator}
  >
    {props.items.map((item, x) => (
      <TouchableOpacity key={x} onPress={() => props.onItemSelected(item.text)}>
        <Name active={item.active}>{item.text}</Name>
      </TouchableOpacity>
    ))}
  </Container>
);

TextList.defaultProps = {
  horizontal: false,
  scrollIndicator: false,
};

TextList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      active: PropTypes.bool,
    })
  ).isRequired,
  horizontal: PropTypes.bool.isRequired,
  scrollIndicator: PropTypes.bool.isRequired,
  height: PropTypes.number,
  onItemSelected: PropTypes.func,
};

// https://github.com/styled-components/styled-components/issues/1015
const Container = styled.ScrollView.attrs(props => ({
  contentContainerStyle: {
    padding: 20,
    paddingLeft: 12,
    paddingTop: 30,
    height: 100,
  },
}))`
  flex-direction: ${props => (props.horizontal ? 'row' : 'column')};
`;

const Name = styled.Text`
  font-size: 32px;
  font-weight: 600;
  margin-left: 15px;
  color: ${props => (props.active ? '#404359' : '#bcbece')};
`;

export default TextList;
