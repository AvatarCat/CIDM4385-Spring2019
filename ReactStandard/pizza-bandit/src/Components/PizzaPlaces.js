import React, { Component } from 'react';

import PizzaPlace from './Components/PizzaPlace';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

class PizzaPlaces extends Component {

    //constructor
    constructor(props){
        super(props);

    }

    render() {

        const places = this.props.places;

        return (
            <div className="card-deck">
                {places.map( (place) => 
                    <PizzaPlace key={place.id} 
                                placedata={place} />
                )}
            </div>
        );
    };
}

export default PizzaPlaces;