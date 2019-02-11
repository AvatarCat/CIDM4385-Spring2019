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

        this.state = {
            selected_pizza: '',
            style_value: 'btn btn-lg btn-block btn-primary',
        };

        this.handleSelectedPizzaButtonClick = this.handleSelectedPizzaButtonClick.bind(this);

    }

    handleSelectedPizzaButtonClick(event){

        //badge badge-success
        this.setState( () => {
                return {
                    style_value: "btn btn-lg btn-block btn-success"
                }
            }
        );        

        this.props.onClick(event.target.value);
    }

    render() {

        const selected_pizza = this.props.pizza_type;

        return (
            <div className="card bg-light mb-3">
                <img src={"src/img/" + this.props.pizza_type + ".png"} className="card-img-top" alt={this.props.pizza_type + " Pizza"} />
                <div className="card-body">
                    <h5 className="card-title">{this.props.pizza_type} Pizza</h5>
                    <p className="card-text">A tasty {this.props.pizza_type} Pizza from a local provider.</p>
                    <button className={this.state.style_value}
                            onClick={this.handleSelectedPizzaButtonClick}
                            value={selected_pizza} >
                        Select {this.props.pizza_type} Pizza
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
            customer_email: '',            
            delivery_zipcode:'',
            order_date: new Date(),
            pizza_type: '',
        }

        this.state = this.initialState;

        //associate method as property
        this.handleOrderSubmit   = this.handleOrderSubmit.bind(this);
        this.handleEmailChange   = this.handleEmailChange.bind(this);        
        this.handleSelectedPizza   = this.handleSelectedPizza.bind(this);
        this.handleZipcodeChange = this.handleZipcodeChange.bind(this);

    };

    handleOrderSubmit(){

        

        //we'd save to the database here in the future

        const order = {
            customer_email: this.state.customer_email,            
            delivery_zipcode: this.state.delivery_zipcode,
            order_date: new Date(),
            pizza_type: this.state.pizza_type,
        };

        this.props.onSubmit(order);

    }
    
    handleSelectedPizza(selected_pizza){

        const pizza_type = selected_pizza;

        this.setState( () => {
                return {
                    pizza_type
                }                
            }
        );
    }

    handleEmailChange(event){
        const customer_email = event.target.value;

        this.setState( () => {
            return {
                customer_email
            }                
        }
    );        

    }

    handleZipcodeChange(event){

        const delivery_zipcode = event.target.value;

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
                    <PizzaEntry onClick={this.handleSelectedPizza} pizza_type="Cheese"/>
                    <PizzaEntry onClick={this.handleSelectedPizza} pizza_type="Pepperoni" />
                    <PizzaEntry onClick={this.handleSelectedPizza} pizza_type="Supreme" />
                </div>
                <div className="form-group">
                <input className="form-control" 
                       id="zipcodeInput" 
                       onChange={this.handleZipcodeChange}                       
                       placeholder="Delivery zip code" 
                       type="text"
                       value={this.state.delivery_zipcode}  />
                </div>
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
                                onClick={this.handleOrderSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
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
            style_value: 'badge badge-warning'
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
                    pizza_type: order.pizza_type + " Pizza",
                    style_value: "badge badge-primary"
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
                        <span className={this.state.style_value}>Date: </span> {this.state.order_date.toLocaleDateString()}<br />
                        <span className={this.state.style_value}>Order Email: </span> {this.state.customer_email} <br />
                        <span className={this.state.style_value}>Order Zipcode: </span> {this.state.delivery_zipcode} <br />
                        <span className={this.state.style_value}>Order Item: </span> {this.state.pizza_type} <br />
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