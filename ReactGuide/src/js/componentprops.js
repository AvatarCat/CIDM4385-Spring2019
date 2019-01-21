function Welcome(props) {
    return <h1>Hello, {props.name}</h1>
}

const element = <Welcome name="Dude" />;

ReactDOM.render(
    element,
    document.getElementById('propslot')
);

function App() {
    return (
        <div>
            <Welcome name="Jack" />
            <Welcome name="Jill" />
            <Welcome name="Rudolf" />
        </div>
    );
}

ReactDOM.render (
    <App />,
    document.getElementById('propslot2')
);