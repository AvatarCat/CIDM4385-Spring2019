import React, { Component } from 'react';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

class LoginForm extends Component {

    //constructor
    constructor(props){
        super(props);

        this.state = {
            email: '',
            results: '',
        }

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);

    }

    //handler for data from child component
    onEmailChange(email){
        
        console.log("From the child: " + email);

        this.setState( () => {
                return {
                    email
                };
            }
        );

        console.log("From the parent state: " + this.state.email);
    }

    onFormSubmit(event){

        event.preventDefault();

        const results = "Email address is: " + this.state.email;

        this.setState( () => {
                return {
                    results
                };
            }
        );

        //this is also lifting state to the parent
        this.props.onFormSubmit(results);

    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <form onSubmit={this.onFormSubmit}>
                    <EmailInput onEmailInputChange={this.onEmailChange} />
                    <PasswordInput />
                    <button type="submit" 
                            className="btn btn-primary">Submit</button>
                </form>
            </div>            
        );
    };
}

export default LoginForm;