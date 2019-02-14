const ToDoList = (props) => {
    return React.createElement('ul', {}, [
            React.createElement('li', 
                                {
                                    className: "text-danger"
                                }, 
                                props.itemone),
            React.createElement('li', 
                                {
                                    className: "text-warning"
                                }, 
                                props.itemtwo),
            React.createElement('li', 
                                {
                                    className: "text-primary"
                                }, 
                                props.itemthree)
        ]
    );
};