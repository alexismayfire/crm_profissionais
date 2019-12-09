import React from 'react';
import {
  Dimensions,
  Image,
  Picker as NativePicker,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon, Overlay } from 'react-native-elements';
import * as ExpoImagePicker from 'expo-image-picker';
import ExpoConstants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Popover from 'react-native-popover-view';

import { Containers, Spacing } from 'styles';
import { Button, Text } from 'components/base';
import Picker from './Picker';

class ImagePicker extends React.Component {
  state = {
    image: null,
    showPicker: false,
    source: null,
    options: [
      { key: 1, text: '-----', value: null },
      { key: 1, text: 'Câmera', value: 'CAMERA' },
      { key: 2, text: 'Biblioteca', value: 'LIBRARY' },
    ],
  };

  componentDidMount() {
    this.getPermissionsAsync();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showPicker && !this.state.showPicker) {
      // Fechou o popover
      // this.pickImage();
    }
  }

  getPermissionsAsync = async () => {
    if (ExpoConstants.platform.ios) {
      const { status } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL,
        Permissions.CAMERA
      );
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions!');
      }
    }
  };

  pickImage = async source => {
    let result = null;

    if (source === 'CAMERA') {
      result = await ExpoImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        // base64,
      });
    } else if (source === 'LIBRARY') {
      result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        // base64,
      });
    }

    this.setState({ showPicker: false, source: null });

    const { onChange, photoId } = this.props;

    if (result && !result.cancelled) {
      onChange(result, photoId);
    }
  };

  renderPickerOptions() {
    return (
      <Popover
        isVisible={this.state.showPicker}
        onRequestClose={() => {
          if (this.state.showPicker) {
            this.setState({ showPicker: false });
          }
        }}
        animationConfig={{ duration: 250 }}
        backgroundStyle={{
          backgroundColor: 'rgba(0, 0, 0, .30)',
        }}
      >
        <View style={{ width: 400 }}>
          <NativePicker
            name="imageSourcePicker"
            selectedValue={this.state.source}
            onValueChange={(itemValue, _) => {
              this.pickImage(itemValue);
              this.setState({ source: itemValue });
            }}
          >
            {this.state.options.map(option => (
              <NativePicker.Item
                key={option.key}
                label={option.text}
                value={option.value}
              />
            ))}
          </NativePicker>
        </View>
      </Popover>
    );
  }

  renderDeleteIcon() {
    const { photoId, onDelete } = this.props;
    if (photoId) {
      return (
        <TouchableOpacity style={styles.deleteIcon}>
          <Icon
            name="times"
            type="font-awesome"
            size={30}
            color="#dc4646"
            onPress={() => onDelete(photoId)}
          />
        </TouchableOpacity>
      );
    }
  }

  render() {
    const { photoUrl } = this.props;

    const placeholder = 'https://via.placeholder.com/150x150';

    return (
      <View style={styles.imageContainer}>
        {this.renderPickerOptions()}
        <TouchableOpacity
          onPress={() => this.setState({ showPicker: true })}
          style={styles.touchableContainer}
        >
          <Image
            source={{ uri: photoUrl ? photoUrl : placeholder }}
            style={styles.image}
          />
        </TouchableOpacity>
        {this.renderDeleteIcon()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    ...Spacing.smallMargin,
  },
  touchableContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    position: 'absolute',
    top: -10,
    left: 80,
  },
});

export default ImagePicker;
