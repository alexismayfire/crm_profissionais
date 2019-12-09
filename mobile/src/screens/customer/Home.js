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

  navigateServiceList = () => {
    this.props.navigation.navigate('ServiceList');
  };

  displayLocation = async () => {
    if (this.state.location == null) {
      await this._getLocationAsync();
      /*
      if (Platform.OS === 'android' && !Constants.isDevice) {
        this.setState({
          text:
            'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        });
      } else {
        await this._getLocationAsync();
      }
      */
    }
    this.setState({
      text: JSON.stringify(this.state.location),
    });
  };

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

  renderLocation() {
    const { location } = this.state;
    if (location) {
      console.log(location);
      const { coords } = location;
      return (
        <View>
          <Text style={styles.paragraph}>
            Mocked: {location.mocked ? location.mocked.toString() : 'false'}
          </Text>
          <Text style={styles.paragraph}>Timestamp: {location.timestamp}</Text>
          {Object.keys(coords).map((key, x) => (
            <Text key={x} style={styles.paragraph}>
              {key}: {coords[key]}
            </Text>
          ))}
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.displayLocation}
            title="Buscar profissionais próximos"
            style={styles.buttonStyle}
          />
        </View>
        {this.renderLocation()}
        <View style={styles.buttonContainer}>
          <Button
            title="Listar serviços disponíveis"
            onPress={this.navigateServiceList}
            style={styles.buttonStyle}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'left',
  },
  buttonContainer: {
    marginVertical: 20,
  },
});
