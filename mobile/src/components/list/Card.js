import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button } from 'components/base';

const Card = props => (
  <Container>
    <Cover>
      <Image source={{ uri: 'https://via.placeholder.com/150x150' }} />
    </Cover>
    <Content>
      <Title>{props.title}</Title>
      {props.content.map((line, x) => (
        <DescriptionLine key={x}>{line}</DescriptionLine>
      ))}
      <PriceCaption>R$ {props.price}</PriceCaption>
      <ButtonContainer>
        <Button
          title={props.buttonTitle}
          onPress={() => alert(`Você selecionou o item ${props.id}`)}
        />
      </ButtonContainer>
    </Content>
  </Container>
);

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
};

const Container = styled.View`
  background: #fff;
  width: 80%;
  border-radius: 5px;
  margin-top: 20px;
  border: 2px solid #b8b3c3;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.25);
  justify-content: center;
`;

const Cover = styled.View`
  width: 100%;
  height: 120px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  overflow: hidden;
  justify-content: center;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const Content = styled.View`
  padding: 10px 16px;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.Text`
  color: #3c4560;
  font-size: 20px;
  font-weight: 600;
  width: 100%;
  text-align: center;
`;

const DescriptionLine = styled.Text`
  color: #3c4560;
  font-size: 20px;
`;

const PriceCaption = styled.Text`
  color: #b8b3c3;
  font-size: 15px;
  font-weight: 600;
  margin-top: 4px;
  width: 100%;
  text-align: right;
`;

const ButtonContainer = styled.View`
  margin-top: 10px;
  width: 100%;
`;

export default Card;
