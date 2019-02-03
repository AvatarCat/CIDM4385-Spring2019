class JumbotronComponent extends React.Component {

    //constructor
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    const element = (
        <div className="jumbotron">
            <h1 className="display-4">Pizza Bandit!</h1>
            <p className="lead">Select the Pizza you want and we'll have a local Pizza Shop deliver the lowest price possible to you now.</p>
            <p>For {date.toLocaleTimeString()}</p>
        </div>
    );
}

ReactDOM.render(
    <JumbotronComponent />,
    document.getElementById('jt')
);    