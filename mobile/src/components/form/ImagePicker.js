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
  }

  pickImage = async (setFieldValue, field, helpers, index) => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // TODO: remover
    console.log(result);

    if (!result.cancelled) {
      setFieldValue(field.name, result);
      if (index < 5) {
        helpers.insert(index, {})
      }
    }
  };

  renderPlaceholder(index, helpers, value) {
    if (value.uri) {
      return (
        <TouchableOpacity
          onPress={() => helpers.remove(index - 1)}
          style={styles.imageIcon}
        >
          <Icon 
            name='minus'
            type='font-awesome'
            size={36}
          />
        </TouchableOpacity>
      );
    }
  }

  render() {
    const { title, field, placeholder } = this.props;
    const { setFieldValue, helpers } = this.props;

    const uriPlaceholder = 'https://via.placeholder.com/150x150';
    const uri = field.value.hasOwnProperty('uri') 
      ? field.value.uri 
      : uriPlaceholder;

    const index = parseInt(field.name.split('.')[1]) + 1;

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity 
            onPress={() => 
              this.pickImage(setFieldValue, field, helpers, index)
            }
            style={styles.touchableContainer}
          >
            <Image source={{ uri }} style={styles.image}/>
          </TouchableOpacity>
          {this.renderPlaceholder(index, helpers, field.value)}
        </View>
        <Text alignment='center'>{`Imagem ${index}`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Containers.createStyles.screen(),
  },
  imageContainer: {
    ...Containers.createStyles.image,
    ...Spacing.mediumMargin,
  },
  touchableContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    position: 'absolute',
    top: Spacing.MEDIUM,
    left: (Dimensions.get('window').width / 2) + 100,
  },
});

export default ImagePicker;