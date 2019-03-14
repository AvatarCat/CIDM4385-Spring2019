import React, { Component } from 'react';
import JumbotronComponent from './Components/JumbotronComponent';
import LoginForm from './Components/LoginForm';
import MapboxMap from './Components/MapboxMap';
import PizzaForm from './Components/PizzaForm';
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

        this.handleLoginFormSubmission = this.handleLoginFormSubmission.bind(this);
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

    handleLoginFormSubmission(formdata){

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
            <div className="row py-2">
                <MapboxMap sendMapCoordsUpdate={this.handleMapCoordsUpdate} />
            </div>
            <div className="row">
                <PizzaForm />
            </div>
            <div className="row">
                <PizzaPlaces coords={
                            {
                                lat: lat,
                                lng: lng,
                            }}
                            title="Pizza Locations" />
            </div>        
            <div id="formresults" className="row"></div>
            </div>
        );
    }
}

export default App;
