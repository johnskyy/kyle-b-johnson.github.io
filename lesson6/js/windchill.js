// Preston coord: 42.0962, -111.8766
// Fish Haven coords:  42.0370, -111.3959 
// Soda Springs coords: 42.6547, -111.6037



function getWeather(town) {
    var lat;
    var lon;
    
    // Switch town (Preston, fish-haven, or soda-springs)
    switch(town) {
    // Case Preston
    case preston:
        lat = 42.0962;
        lon = -111.8766;
        break;
    //Case fish-haven
    case fish-haven:
        lat = 42.0370;
        lon = -111.3959;
        break;
    //Case soda-springs
    case soda-springs:
        lat = 42.6547;
        lon = -111.6037;
        break;
    }

    var url = "https://api.weather.gov/points/" + lat + "," + lon;
    var noaaData = getNOAAData(url);
    var forecastUrl = noaaData.properties.forecast;
    noaaData = getNOAAData(forecastUrl);
    var temp = noaaData.properties.periods[0].temperature;
    var windSpeed = noaaData.properties.periods[0].windSpeed;
    var current = noaaData.properties.periods[0].shortForrecast;
    if (noaaData.properties.periods[0].isDaytime) {


    }

    document.getElementById("current").innerHTML= current;
    document.getElementById("temp").innerHTML =  temp + "F";
    document.getElementByID("wind-speed").innerHTML = windSpeed + "mph";
    document.getElementById("wind-chill").innerHTML = 35.74 + 
        (0.6215 * parseInt(temp)) - (35.75 * (parseInt(windSpeed)**0.16)) 
        + (0.4275 * parseInt(temp) * (parseInt(windSpeed)**0.16));

return;

}

function getNOAAData(url){
    var noaaHTTP =new XMLHttpRequest();
    noaaHTTP.open("GET", url, false);
    noaaHTTP.send(null);
    return noaaHTTP.responseText;
}