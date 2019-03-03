import React, { Component } from 'react';

class PizzaPlace extends Component {

    //constructor
    constructor(props){
        super(props);
    }

    render() {

        const {title, vicinity, categoryTitle} = this.props.placedata;

        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{vicinity}</p>
                    <p className="card-text">
                        <small class="text-muted">{categoryTitle}</small>
                    </p>
                </div>
            </div>
        );
    };
}

export default PizzaPlace;