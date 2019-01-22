class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        emailvalue: '',
        passwordvalue: '',
        checkboxvalue: true
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCheckboxClicked = this.handleCheckboxClicked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({emailvalue: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({passwordvalue: event.target.value});
  }
  
  handleCheckboxClicked(event) {
    this.setState({checkboxvalue: event.target.value});
    console.log('you checked it out');
  }

  handleSubmit(event) {
    alert('A login was attempted: ' + this.state.emailvalue);
    event.preventDefault();
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Email address
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                    value={this.state.emailvalue} onChange={this.handleEmailChange}  />
                </label>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label>Password
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" 
                    value={this.state.passwordvalue} onChange={this.handlePasswordChange}/>
                </label>
            </div>
            <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" value={this.state.checkboxvalue} onClick={this.handleCheckboxClicked}/>
                <label className="form-check-label">Check me out</label>
            </div>
            <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
    );
  }
}

ReactDOM.render(
    <SignInForm />,
    document.getElementById('formslot')
  );