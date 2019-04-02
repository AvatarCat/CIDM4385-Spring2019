import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.getLocation = this.getLocation.bind(this);
    this.showPosition = this.showPosition.bind(this);
    this.showDarkSkyTemperature = this.showDarkSkyTemperature(this);
    this.doFtoC = this.doFtoC.bind(this);

    this.state = {
      lat: 0,
      lon: 0,
      error: '',
      tempF: 0,
      tempC: 0,
      tempUnit: 'F',
    };

  }

  componentDidMount(){
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      this.setState({
          error: "Geolocation is not supported by this device.",
        }
      );
    }
  }
    
  showPosition(position) {
    this.setState(
      {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      }
    );
  }

  doFtoC(tempF){
    //formula reference: https://www.metric-conversions.org/temperature/fahrenheit-to-celsius.htm
    let tempC = (tempF - 32) / 1.8;
    this.setState(
      {
        tempC
      }
    );
  }
  
  showDarkSkyTemperature(){

    const {lat, lon} = this.state;
    const url = "https://api.darksky.net/forecast/";
    const api = Config.DARK_SKY_API_KEY;

    //https://api.darksky.net/forecast/692503121283ca651d6fd8ff4e1761e9/37.8267,-122.4233
    fetch(url.concat("/", api, "/", lat, ",", lon))
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({

        })
      })
      .catch((error) => {
        console.error(error);
      });    

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Lat:{this.state.lat} Lon:{this.state.lon}</Text>
        <Text>{this.state.error}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
