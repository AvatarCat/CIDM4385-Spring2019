class Clock extends React.Component {
    render() {
        return (
            <div>
                <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

function tick() {
    ReactDOM.render(
        <Clock date={new Date()} />, 
        document.getElementById('timeslot2')
    );
}

setInterval(tick, 1000);