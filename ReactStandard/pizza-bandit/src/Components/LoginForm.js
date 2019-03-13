import React, { Component } from 'react';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

class LoginForm extends Component {

    //constructor
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            results: '',
        }

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);

    }

    //method to receive lifted Email state from child
    onEmailChange(email){
        
        console.log("Email from the child: " + email);

        this.setState( () => {
                return {
                    email
                };
            }
        );

        console.log("Password from the parent state: " + this.state.email);
    }

    //method to receive lifted Password state from child
    onPasswordChange(password){
        
        console.log("From the child: " + password);

        this.setState( () => {
                return {
                    password
                };
            }
        );

        console.log("Password from the parent state: " + this.state.password);
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
                <form onSubmit={this.onFormSubmit}>
                    <EmailInput onEmailInputChange={this.onEmailChange} 
                                test="dubs" />
                    <PasswordInput onPasswordInputChange={this.onPasswordChange} />
                    <button type="submit" 
                            className="btn btn-primary">Submit</button>
                </form>
            </div>            
        );
    };
}

export default LoginForm;