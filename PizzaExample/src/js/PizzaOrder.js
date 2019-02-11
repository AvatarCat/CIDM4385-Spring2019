export class PizzaOrder {
    constructor(config){
        this.customer_email = config.customer_email;
        this.order_date = config.order_date;
        this.zip_code = config.zip_code;
        this.pizza_type = config.pizza_type;        
    }
}