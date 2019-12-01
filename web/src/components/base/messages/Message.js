import React from 'react';
import PropTypes from "prop-types";
import { Message as SemanticMessage } from 'semantic-ui-react';

const baseProps = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const Message = props => (
  <SemanticMessage positive={props.positive} negative={props.negative}>
    <SemanticMessage.Header>{props.title}</SemanticMessage.Header>
    {props.children}
  </SemanticMessage>
);

Message.propTypes = {
  ...baseProps,
  positive: PropTypes.bool,
  negative: PropTypes.bool
};

export const MessageSuccess = props => (
  <Message title={props.title} positive>
    {props.children}
  </Message>
);

MessageSuccess.propTypes = baseProps;

export const MessageError = props => (
  <Message title={props.title} negative>
    {props.children}
  </Message>
);

MessageError.propTypes = baseProps;