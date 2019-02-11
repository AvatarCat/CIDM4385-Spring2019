//import PizzaOrder from "../js/PizzaOrder";

class JumbotronComponent extends React.Component {

    //constructor
    constructor(props) {
        super(props);
        this.state = {order_date: new Date()};
    };

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">Pizza Bandit!</h1>
                <p className="lead">Select the Pizza you want and we'll have a local Pizza Shop deliver the lowest price possible to you now. All sizes are Large.</p>
                <p>For {this.state.order_date.toDateString()}</p>
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

class ZipCodeInput extends React.Component {

    //constructor
    constructor(props){
        super(props);
        this.state = {delivery_zipcode: ''}; 

        this.handleZipcodeChange = this.handleZipcodeChange.bind(this);

    }

    handleZipcodeChange(event){
        const delivery_zipcode = event.target.value;
        this.setState( () => {
                return {
                    delivery_zipcode
                }
            }
        );

        const zip = this.state.delivery_zipcode;

        this.props.handleZipcode(zip);
    }    

    render() {
        return (
            <div className="form-group">
                <input className="form-control" 
                       id="zipcodeInput" 
                       onChange={this.handleZipcodeChange}                       
                       placeholder="Delivery zip code" 
                       type="input"
                       value={this.state.delivery_zipcode}  />
            </div>
        );
    };
}

class UserAccountInput extends React.Component {
    
    //constructor
    constructor(props) {
        super(props);
        
        this.state = {customer_email: ''};

        this.handleEmailChange = this.handleEmailChange.bind(this);        
        this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
    };

    handleEmailChange(event){
        const customer_email = event.target.value;
        this.setState( () => {
                return {
                    customer_email
                }
            }
        );
    }

    //button clicked
    handleEmailSubmit(event){

        this.props.handleOrderSubmit(this.state.customer_email);
    }

    render() {
        return (
            <div className="input-group mb-3">
                <input 
                    className="form-control"            
                    id="emailInput"
                    onChange={this.handleEmailChange}
                    placeholder="User email address"
                    type="text"
                    value={this.state.customer_email} />
                <div className="input-group-append">
                    <button className="btn btn-primary" 
                            id="button-addon2"
                            onClick={this.handleEmailSubmit}>
                        Submit
                    </button>
                </div>
            </div>  
        );
    }
}

class PizzaForm extends React.Component{
    //constructor
    constructor(props) {
        super(props);

        this.initialState = {       
            delivery_zipcode:'',
            order_date: new Date(),
            order_email: '',
            pizza_type: '',
        }

        this.state = this.initialState;

        //associate method as property
        this.handleOrderSubmit   = this.handleOrderSubmit.bind(this);
        this.handleSelectPizza   = this.handleSelectPizza.bind(this);
        this.handleZipcode       = this.handleZipcode.bind(this);

    };

    handleOrderSubmit(email){

        //we'd save to the database here in the future

        this.setState( () => {
                return {
                    customer_email: email,
                }                
            }
        );

    }
    
    handleSelectPizza(selected){

        this.setState( () => {
                return {
                    pizza_type: selected
                }                
            }
        );
    }

    handleZipcode(event){

        this.setState( () => {
                return {
                    delivery_zipcode
                }
            }
        );
    }     

    render() {
        return (
            <div>
                <div className="card-group">
                    <PizzaEntry onClick={this.handleSelectPizza} pizza_type="Cheese"/>
                    <PizzaEntry onClick={this.handleSelectPizza} pizza_type="Pepperoni" />
                    <PizzaEntry onClick={this.handleSelectPizza} pizza_type="Supreme" />
                </div>
                <ZipCodeInput onChange={this.handleZipcode}/>
                <UserAccountInput onSubmit={this.handleOrderSubmit} />
            </div>
        );
    };
}

class PizzaBanditComponent extends React.Component{
    
    //constructor
    constructor(props) {
        super(props);

        this.initialState = {
            customer_email: '',            
            delivery_zipcode:'',            
            order_date: new Date(),
            pizza_type: '',
        }

        this.state = this.initialState;
        this.handlePizzaForm = this.handlePizzaForm.bind(this);

    };

    handlePizzaForm(order) {

        /*
        const pizzaOrder = new PizzaOrder(order.customer_email,
                                          order.delivery_zipcode,
                                          order.order_date,
                                          order.pizza_type);
        */

        this.setState( () => {
                return {
                    customer_email: order.customer_email,
                    delivery_zipcode: order.delivery_zipcode,
                    pizza_type: order.pizza_type,
                }                
            }
        );
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <JumbotronComponent />                    
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <PizzaForm onSubmit={this.handlePizzaForm}/>
                    </div>                    
                </div>
                <div className="row">
                    <div className="col">
                        <p>
                            {this.state.customer_email}
                            {this.state.delivery_zipcode}
                        </p>
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