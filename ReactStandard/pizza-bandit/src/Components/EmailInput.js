import React from 'react';

var EmailInput = (props) => {

    let email = '';    

    const onEmailChange = (event) => {
        
        email = event.target.value;

        //this is lifting the state value to the parent
        props.onEmailInputChange(email);        

    };

    return(
        <div className="form-group">
        <p>Test message: {props.test}</p>
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input 
            aria-describedby="emailHelp" 
            className="form-control" 
            id="exampleInputEmail1" 
            onChange={onEmailChange}
            placeholder="Enter email"
            type="email"
            value={email}  />
        </div>
    );
};

export default EmailInput;
