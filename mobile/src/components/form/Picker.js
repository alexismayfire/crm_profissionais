import React from 'react';
import { Picker as NativePicker } from 'react-native';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { Button, Overlay, Text } from 'components/base';

class Picker extends React.Component {
  state = { pickerVisible: false };

  render() {
    const { title, field, options, setFieldValue } = this.props;

    return (
      <View>
        <Button
          title={title}
          onPress={() => this.setState({ pickerVisible: true })}
        />
        <Overlay
          isVisible={this.state.pickerVisible}
          onPress={() => this.setState({ pickerVisible: false })}
        >
          <View>
            <Text alignment="center">{field.label}</Text>
            <NativePicker
              name={field.name}
              selectedValue={field.value}
              onValueChange={(itemValue, itemIndex) => {
                setFieldValue(field.name, itemValue);
              }}
              mode="dropdown"
              prompt={field.label}
            >
              {options.map(option => (
                <NativePicker.Item
                  key={option.key}
                  label={option.text}
                  value={option.value}
                />
              ))}
            </NativePicker>
            <Button
              title="Confirmar"
              onPress={() => this.setState({ pickerVisible: false })}
            />
          </View>
        </Overlay>
      </View>
    );
  }
}

Picker.propTypes = {
  title: PropTypes.string.isRequired,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
  }).isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.any,
    })
  ).isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default Picker;
