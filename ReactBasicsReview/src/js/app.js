class AppComponent extends React.Component {

    //constructor
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="container">
                <BasicForm />
            </div>
        );
    };
}

/*
const App = () => {
    return React.createElement('div', {}, [
        React.createElement('h1', null, "To Do List"),
        React.createElement(ToDoList, {
            itemone: "brush up on React",
            itemtwo: "practice more git commands",
            itemthree: "learn more JavaScript"
        }),
        React.createElement(FormInput, {}),
    ]);
};*/

var root = document.getElementById('root');
// ReactDOM.render(React.createElement(AppComponent), root);
ReactDOM.render(<AppComponent />, root);