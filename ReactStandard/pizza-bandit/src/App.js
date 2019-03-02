import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import LoginForm from './Components/LoginForm';
import './App.css';

console.log(process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN);
console.log(process.env.NODE_ENV);

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN,
}); 

class App extends Component {

  constructor(props) {
    super(props);

    const mapstyles = ["basic", "streets", "bright", "light", "dark", "satellite"];
    
    this.state = {
      lng: -98.5795,
      lat: 39.828175,
      zoom: 2,
      mapstyle: mapstyles[Math.floor(Math.random() * mapstyles.length)],
    };

    this.getPizzaPlacesFromHereAPI = this.getPizzaPlacesFromHereAPI.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.randomizeMapStyle = this.randomizeMapStyle.bind(this);
    this.setCurrentLocation = this.setCurrentLocation.bind(this);

  }
  
  //lifecycle method
  componentDidMount(){

    //get location from browser
    this.setCurrentLocation();

    //make rest call
  }  

  getPizzaPlacesFromHereAPI(){

  }

  handleFormSubmission(formdata){

  }    

  /* Randomly select a map style */
  randomizeMapStyle(){
    const selected = this.state.mapstyles[Math.floor(Math.random() * this.state.mapstyles.length)];
    return selected;
  }  

  /* get current location from browser/user agent */
  setCurrentLocation(){
    //check to see if we can get the browser's geolocation
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        //set state properties for lat and long
        this.setState( () => {
            return {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }
        );
      });
    }else{
      console.log("Geolocation is not supported by this browser.");
    }
  }

  render() {

    //unpacking the object
    const { lng, lat, zoom, mapstyle } = this.state;

    return (
      <div className="container">
        <LoginForm onFormSubmit={this.handleFormSubmission} 
                   title="Pizza Bandit" />
        <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        <Map style={`mapbox://styles/mapbox/${mapstyle}-v9`}
             center={[lng, lat]}
             containerStyle={{
               //set height to be 1/3 of available screen height - this is vanilla javascript
               height: window.screen.availHeight / 3 + "px",
               width: "100%"
             }}>
             <Layer type="symbol"
                    id="marker"
                    layout={{ "icon-image": "marker-15"}}>
                    <Feature coordinates={[lng, lat]}/>
             </Layer>
        </Map>
      </div>
    );
  }
}

export default App;
