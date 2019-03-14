//npm imports
import React, { Component } from 'react';
import * as firebase from 'firebase';

//my imports
import JumbotronComponent from './Components/JumbotronComponent';
import LoginForm from './Components/LoginForm';
import LogoutForm from './Components/LogoutForm';
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
            uid: '',
            userDisplayName: '',
            userEmail: '',
            userAuthenticated: false
        };

        this.handleLoginFormSubmission = this.handleLoginFormSubmission.bind(this);
        this.handleMapCoordsUpdate = this.handleMapCoordsUpdate.bind(this);
        this.initFirebase = this.initFirebase.bind(this);

        //call init firebase
        this.firebaseapp = this.initFirebase();        
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

    handleLoginFormSubmission(userdata){

    }    

    initFirebase(){

        // REACT_APP_FIREBASE_API_KEY="AIzaSyAmyoDPN3I_UTRyKxNyKVgSXEtlOKXbt2o"
        // REACT_APP_FIREBASE_AUTH_DOMAIN="cidm4385-spring2019.firebaseapp.com"
        // REACT_APP_FIREBASE_DATABASE_URL="https://cidm4385-spring2019.firebaseio.com"
        // REACT_APP_FIREBASE_PROJECT_ID="cidm4385-spring2019"
        // REACT_APP_STORAGE_BUCKET="cidm4385-spring2019.appspot.com"
        // REACT_APP_MESSAGING_SENDER_ID="902346719730"        

        const firebaseapp = firebase.initializeApp(
            {
                apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
                authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
                databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
                projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
                storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
                messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
            }
        );

        //what to do when authenticated
        //this example was useful: https://github.com/firebase/quickstart-js/blob/master/auth/email-password.html
        firebaseapp.auth().onAuthStateChanged( (user) => {

                //user logged in
                //values for id, displayname, and email come from firebase
                if(user){
                    //get and set state values
                    this.setState( () => {
                            return {
                                uid: user.id,
                                userDisplayName: user.displayName,
                                userEmail: user.email,
                                userAuthenticated: true
                            };
                        }
                    );
                    console.log(`${this.state.userDisplayName} (${this.state.email}) is logged in`);
                } 
                //user not logged in
                else {
                    //unset state values
                    this.setState( () => {
                            return {
                                uid: '',
                                userDisplayName: '',
                                userEmail: '',
                                userAuthenticated: false
                            };
                        }
                    );
                    console.log('nobody is logged in');

                }
            }
        );

        return firebaseapp;

    }

    render() {

        //unpacking the object
        const { lng, lat, } = this.state;

        let login_content;

        //we'll conditionally show login or logout
        if(this.state.userAuthenticated === false){
            login_content = <LoginForm firebase={this.firebaseapp}
                                       form_name="Login"
                                       onFormSubmit={this.handleLoginFormSubmission}  />
        }else{
            login_content= <LogoutForm />
        }

        return (
            <div className="container">
            <div className="row">
                <JumbotronComponent app_name={this.app_name}
                                    order_date={this.order_date} />
            </div>
            <div className="row">
                {login_content}
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