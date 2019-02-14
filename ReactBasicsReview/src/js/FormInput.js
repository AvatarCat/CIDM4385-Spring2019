/*
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
  </div>
*/

const FormInput = (props) => {
    return React.createElement('div', {className: "form-group"}, 
        [
            React.createElement('label', 
                                {
                                    htmlFor: "exampleInputEmail1"
                                }, 
                                "Email address"
            ),
            React.createElement('input', 
                                {
                                    className: "form-control",
                                    type: "email",
                                    id: "exampleInputEmail1",
                                    placeholder: "Enter email"
                                },
            ),
        ]
    );
};