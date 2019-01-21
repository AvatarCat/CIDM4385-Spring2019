var locationelement = ( 
    <div>
        <h3>Latitude: </h3>
        <h3>Longitude: </h3>
    </div>    
);

function locationFound(position) {
    locationelement = (
        <div>
            <h3>Latitude: {position.coords.latitude}</h3>
            <h3>Longitude: {position.coords.longitude}</h3>
        </div>
    );
}

function tick() {

    var locationoutput = "";

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(locationFound);
    }else{
        locationelement = (
            <p>NO GEOLOCATION</p>
        );
    }

    const element = (
        <div>
            {locationelement}
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(element, document.getElementById('timeslot'));
}
  
setInterval(tick, 1000);