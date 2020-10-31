// Preston coord: 42.0962, -111.8766
// Fish Haven coords:  42.0370, -111.3959 
// Soda Springs coords: 42.6547, -111.6037



function getWeather(town) {
    var lat;
    var lon;
    
    // Switch town (Preston, fish-haven, or soda-springs)
    switch(town) {
    // Case Preston
    case "preston":
        lat = 42.0962;
        lon = -111.8766;
        break;
    //Case fish-haven
    case "fish-haven":
        lat = 42.0370;
        lon = -111.3959;
        break;
    //Case soda-springs
    case "soda-springs":
        lat = 42.6547;
        lon = -111.6037;
        break;
    }

    var url = "https://api.weather.gov/points/" + lat + "," + lon;
    var noaaData = getNOAAData(url);
    var forecastUrl = noaaData.properties.forecast;
// }

// function callBack (forecastUrl) {
    var noaaData = getNOAAData(forecastUrl);
    var temp = noaaData.properties.periods[0].temperature;
    var windSpeed = noaaData.properties.periods[0].windSpeed;
    var current = noaaData.properties.periods[0].shortForecast;
    /*
        - create array containing ids of forecast days
        - if current period (0) isDaytime = true:
            - foreach in id array:
                - for (int i; i %2 == 0; i += 1)
                -innerHTML = ¿¿¿stringSplit???(
                    noaaData.properties.periods[i].shortForecast 
                    -> then)

    if (noaaData.properties.periods[0].isDaytime) {


    }*/

    document.getElementById("current").innerHTML= current;
    document.getElementById("temp").innerHTML =  temp + "&#176 F";
    document.getElementById("wind-speed").innerHTML = windSpeed;
    
    if (parseInt(temp) < 50 && parseInt(windSpeed) > 3 ){
    document.getElementById("wind-chill").innerHTML = 
    getWindChill(parseInt(temp), parseInt(windSpeed)) + "&#176 F";
    }
    else {
        document.getElementById("wind-chill").innerHTML = "N/A";
    }

// string split

return;

}

function getWindChill(temp, windSpeed) {
    var windChill = 35.74 + 
    (0.6215 * parseInt(temp)) - (35.75 * (parseInt(windSpeed)**0.16)) 
    + (0.4275 * parseInt(temp) * (parseInt(windSpeed)**0.16))

    return Math.round(windChill);
}

function getNOAAData(url){
    // do {} while  ((response code) < 200 && (response code) > 299)

    var noaaHTTP =new XMLHttpRequest();
    var noaaData;
    //noaaHTTP.addEventListener("load", callBack);
    do{
    noaaHTTP.open("GET", url, false);
    noaaHTTP.send(null);
    noaaData = JSON.parse(noaaHTTP.responseText);
    }
    while (noaaData.status < 200 || noaaData.status > 299);

    return noaaData;
}