import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import JumbotronComponent from './Components/JumbotronComponent';
import LoginForm from './Components/LoginForm';
import MapboxMap from './Components/MapboxMap';
import PizzaPlaces from './Components/PizzaPlaces';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.app_name = "Pizza Bandit";
        this.order_date = new Date();
        
        this.state = {
            lng: -98.5795,
            lat: 39.828175,
        };

        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.handleMapCoordsUpdate = this.handleMapCoordsUpdate.bind(this);
    }

    handleMapCoordsUpdate(coords){

        console.log(`Coords from child: LAT ${coords.lat} and LNG ${coords.lng}`)

        this.setState( () => {
                return {
                    lat: coords.lat,
                    lng: coords.lng,
                };
            }
        );
    }

    handleFormSubmission(formdata){

    }    

    render() {

        //unpacking the object
        const { lng, lat, } = this.state;

        return (
            <div className="container">
            <div className="row">
                <JumbotronComponent app_name={this.app_name}
                                    order_date={this.order_date} />
            </div>
            <div className="row">
                <LoginForm form_name="Login"
                            onFormSubmit={this.handleFormSubmission}  />
            </div>                   
            <div className="row py-3">
                <MapboxMap sendMapCoordsUpdate={this.handleMapCoordsUpdate} />
            </div>
            <div className="row">
                <h1>Pizza Places</h1>        
                <PizzaPlaces coords={
                            {
                                lat: lat,
                                lng: lng,
                            }} />
            </div>        
            <div id="formresults" className="row"></div>
            </div>
        );
    }
}

export default App;
