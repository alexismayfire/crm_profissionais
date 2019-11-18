import React from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";
import { Transition, animated } from "react-spring/renderprops";

const AnimatedErrorMessage = props => {
  const { touched, hasError, error } = props;
  const items =
    touched && hasError ? [<Message error content={error} />] : [];

  return (
    <Transition
      native
      items={items}
      from={{ opacity: 0, minHeight: "0em", marginBottom: 0 }}
      enter={[{ opacity: 1, minHeight: "1em", marginBottom: "" }]}
      leave={[{ opacity: 0, minHeight: "0em", marginBottom: 0 }]}
    >
      {item => props => (
        <animated.div style={props} className="ui form field" children={item} />
      )}
    </Transition>
  );
};

AnimatedErrorMessage.propTypes = {
  touched: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default AnimatedErrorMessage;
