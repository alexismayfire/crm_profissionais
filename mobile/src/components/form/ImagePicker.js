import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { Containers } from 'styles';
import { Button, Text } from 'components/base';

class ImagePicker extends React.Component {
  state = { image: null };

  componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions!');
      }
    }
  }

  pickImage = async (setFieldValue, field) => {
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
    }
  };

  renderImage(field) {
    if (field.value) {
      return (
        <View>
          <Image 
            source={{ uri: field.value.uri }} 
            style={styles.image}
          />
        </View>
      )
    }
  }

  render() {
    const { title, field, placeholder, setFieldValue } = this.props;

    return (
      <View>
        <Text>Imagem</Text>
        {this.renderImage(field)}
        <Button
          title={field.value ? 'Alterar' : placeholder}
          onPress={() => this.pickImage(setFieldValue, field)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    ...Containers.createStyles.screen(),
  },
  image: {
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
});

export default ImagePicker;