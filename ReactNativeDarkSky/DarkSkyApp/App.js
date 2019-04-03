import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DARK_SKY_API_KEY } from 'react-native-dotenv';


export default class App extends React.Component {

  constructor(props){
    super(props);


    this.state = {
      lat: 0,
      lon: 0,
      error: '',
      tempF: 0,
      tempC: 0,
      tempUnit: 'F',
      givenName: 'Stranger',
    };
    
    this.getLocation = this.getLocation.bind(this);
    this.showPosition = this.showPosition.bind(this);
    this.getDarkSkyTemperature = this.getDarkSkyTemperature.bind(this);
    this.handleTempUnitButtonPress = this.handleTempUnitButtonPress.bind(this);
    this.doFtoC = this.doFtoC.bind(this);

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

    this.getDarkSkyTemperature();    
    console.log(`${this.state.lat} ${this.state.lon}`);
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
  
  getDarkSkyTemperature(){

    const {lat, lon,} = this.state;
    const url = "https://api.darksky.net/forecast/";
    const api = DARK_SKY_API_KEY;

    fetch(url + api +  "/" + lat +  "," + lon)
      // .then((response) => console.log(response))
      .then( (response) => response.json() )
      .then((responseJson) => {

        console.log(responseJson);

        this.setState({
          tempF: responseJson.currently.temperature,
        })

        this.doFtoC(responseJson.currently.temperature);
      })
      .catch((error) => {
        this.setState(
          {
            error
          }
        );
        console.error(error);
      });    

  }

  handleTempUnitButtonPress( event ){
    if(this.state.tempUnit == 'F'){
      this.setState({
        tempUnit: 'C'
      })
    }else{
      this.setState({
        tempUnit: 'F'
      })      
    }
  }  

  render() {

    let tempvalue = '';

    //math.round: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
    if(this.state.tempUnit == 'F'){
      tempvalue = Math.round(this.state.tempF);
    }else{
      tempvalue = Math.round(this.state.tempC);
    }

    return (
      <View style={styles.container}>
        {/* <Text>Lat:{this.state.lat} Lon:{this.state.lon}</Text> */}
        <Text>{this.state.error}</Text>
        <TextInput 
          placeholder="Enter your name here"
          onChangeText={ (givenName) => this.setState( { givenName } ) }
          style={{height:30, width:120 }}
          textAlign={'center'} />
        <Text>Hello, {this.state.givenName}, the temperature is: </Text>
        <Text>{tempvalue} {this.state.tempUnit}</Text>
        <Button 
          onPress={this.handleTempUnitButtonPress}
          title="Change Temp Unit"
          style={styles.buttonTemp}
          />
      </View>          
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTemp: {
    color: "#841584",
    borderWidth: 1,
    padding: 25,
    borderColor: 'black',
    backgroundColor: 'red',
  }
});
