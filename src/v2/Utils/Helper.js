import React from 'react';

if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(printCoor);
} else {
    alert("Geolocation is not supported by this browser.");
}

function printCoor(coor) {
    return(
        <h1>{`Current location: ${coor.coords.latitude}:${coor.coords.longitude}`}</h1>
    )
};