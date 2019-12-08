import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import * as ExpoImagePicker from 'expo-image-picker';
import ExpoConstants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { Containers, Spacing } from 'styles';
import { Button, Text } from 'components/base';

class ImagePicker extends React.Component {
  state = { image: null };

  componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    if (ExpoConstants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions!');
      }
    }
  };

  pickImage = async (setFieldValue, field, helpers, index) => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // TODO: remover
    console.log(result);

    if (!result.cancelled) {
      setFieldValue(field.name, result);
      if (index < 5) {
        helpers.insert(index, {});
      }
    }
  };

  renderPlaceholder(index, helpers, value) {
    if (value.uri || value.photo) {
      return (
        <TouchableOpacity
          onPress={() => helpers.remove(index - 1)}
          style={styles.imageIcon}
        >
          <Icon name="minus" type="font-awesome" size={36} />
        </TouchableOpacity>
      );
    }
  }

  render() {
    const { title, field, placeholder } = this.props;
    const { setFieldValue, helpers } = this.props;

    const index = parseInt(field.name.split('.')[1]) + 1;

    const uriPlaceholder = 'https://via.placeholder.com/150x150';
    const uri = field.value.hasOwnProperty('photo')
      ? field.value.photo
      : uriPlaceholder;

    return (
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() => this.pickImage(setFieldValue, field, helpers, index)}
          style={styles.touchableContainer}
        >
          <Image source={{ uri }} style={styles.image} />
        </TouchableOpacity>
        {this.renderPlaceholder(index, helpers, field.value)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    ...Spacing.mediumMargin,
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
  imageIcon: {
    position: 'absolute',
    top: Spacing.MEDIUM,
    left: Dimensions.get('window').width / 2 + 50,
  },
});

export default ImagePicker;
