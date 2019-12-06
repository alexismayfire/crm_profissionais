import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class Home extends Component {
  state = {
    location: null,
    text: '',
  };

  displayLocation = async () => {
    if (this.state.location == null){
      if (Platform.OS === 'android' && !Constants.isDevice) {
        this.setState({
          text: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        });
      } else {
        await this._getLocationAsync();
      }
    }
    this.setState({
      text: JSON.stringify(this.state.location)
    })
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        text: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.displayLocation} title='Buscar profissionais próximos'/>
        <Text style={styles.paragraph}>{this.state.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});