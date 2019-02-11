class JumbotronComponent extends React.Component {

    //constructor
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    };

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">Pizza Bandit!</h1>
                <p className="lead">Select the Pizza you want and we'll have a local Pizza Shop deliver the lowest price possible to you now.</p>
                <p>For {this.state.date.toDateString()}</p>
            </div>
        );
    };
}

class ZipCodeEntry extends React.Component {

    //constructor
    constructor(props){
        super(props);
        this.state = {zipcode: ''};        
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor="zipcodeInput">Enter your Zip Code</label>
                <input type="password" className="form-control" id="zipcodeInput" placeholder="Zip Code" />
            </div>
        );
    };
}

class PizzaEntry extends React.Component {
    //constructor
    constructor(props){
        super(props);
    }    

    render() {
        return (
            <div className="card bg-light mb-3">
                <img src={"src/img/" + this.props.pizza_type + ".png"} className="card-img-top" alt={this.props.pizza_type + " Pizza"} />
                <div className="card-body">
                    <h5 className="card-title">{this.props.pizza_type} Pizza</h5>
                    <p className="card-text">A tasty {this.props.pizza_type} Pizza from a local provider.</p>
                    <button type="button" className="btn btn-lg btn-block btn-primary">Select {this.props.pizza_type} Pizza</button>
                </div>
            </div>
        );        
    }
}

class UserAccountInput extends React.Component {
    //constructor
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    };

    render() {
        return (
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="email address" aria-label="User email address" aria-describedby="button-addon2" />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="submit" id="button-addon2">Submit</button>
                </div>
            </div>  
        );
    }
}

class PizzaBanditComponent extends React.Component{
    //constructor
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    };

    render() {
        return (
            <div className="container">            
                <JumbotronComponent />
                <div id="pizzaform" className="row">
                    <div className="col">
                        <form>
                            <ZipCodeEntry />
                            <div className="card-group">
                                <PizzaEntry pizza_type="Cheese" />
                                <PizzaEntry pizza_type="Pepperoni" />
                                <PizzaEntry pizza_type="Supreme" />
                            </div>
                            <UserAccountInput />
                        </form>
                    </div>
                </div>
            </div>
        );
    };
}

ReactDOM.render(
    <PizzaBanditComponent />,
    document.getElementById('pizzabandit')
);    