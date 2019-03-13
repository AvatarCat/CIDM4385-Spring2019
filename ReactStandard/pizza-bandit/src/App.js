import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import LoginForm from './Components/LoginForm';
import PizzaPlaces from './Components/PizzaPlaces';
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
      pizza_place_list: [],
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

  }  

  componentDidUpdate(prevProps, prevState, snapshot){

    /*so we don't update on every little change, just check to see
      if lat or lon changed */
    if(this.state.lat !== prevState.lat || this.state.lng !== prevState.lng){

      console.log(`Previous Lat: ${prevState.lat} and Prevous Lon:${prevState.lng}`);
      console.log(`Current Lat: ${this.state.lat} and Current Lon:${this.state.lng}`);      

      //make rest call
      this.getPizzaPlacesFromHereAPI();    
    }

  }

  getPizzaPlacesFromHereAPI(){
    
    const here_api_url      = "https://places.cit.api.here.com/places/v1/autosuggest?";
    const here_api_at       = `at=${this.state.lat},${this.state.lng}&`;
    const here_api_q        = "q=pizza&";
    const here_api_app_id   = `app_id=${process.env.REACT_APP_HERE_API_APP_ID}&`;
    const here_api_app_code = `app_code=${process.env.REACT_APP_HERE_API_APP_CODE}`;

    //the built-in fetch API will make the REST/AJAX call for us: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch    
    fetch(here_api_url + here_api_at + here_api_q + here_api_app_id + here_api_app_code)
      .then( (response) => {
          //call HERE API and get returned list
          return response.json();
        }
      )
      //filter down to response that have locations (lat/lon)
      .then( (responseAsJson) => {

        //use the JavaScript filter method - https://www.w3schools.com/jsref/jsref_filter.asp
        const filtered = responseAsJson.results.filter( (result) => {
          //this checks to see if this record has a position array
          return result.position;

        });

        //return the filtered results
        return filtered;
        
      })
      //receive the promise response returned as a JSON object
      .then( (filtered) => {

          this.setState( () => {
            return {
              pizza_place_list: filtered,
            }
          }
        );

        return filtered;
      })
      .then( (filtered) => {

        this.state.pizza_place_list.forEach( (pizza_place) => {
            const pizzalocation = pizza_place.title + ' ' +
                                  pizza_place.vicinity + ' ' +
                                  pizza_place.category;

            console.log(pizzalocation);
          }
        );
        console.log(this.state.pizza_place_list[2].title);
      })
      .catch(error => console.error(error));
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
        <div className="row">
        <LoginForm onFormSubmit={this.handleFormSubmission} 
                   title="Pizza Bandit" />
        </div>                   
        <div className="row">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div className="row py-3">
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
        <div className="row">
          <h1>Pizza Places</h1>        
          <PizzaPlaces places={this.state.pizza_place_list} />
        </div>        
        <div id="formresults" className="row"></div>
      </div>
    );
  }
}

export default App;
