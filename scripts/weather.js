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

    var url = "https://api.openweathermap.org/data/2.5/weather?"
    + "&units=imperial" + "&appid=35e5ec263759a312d3f805aecf976efa" 
        + "&lat="+ lat + "&lon=" + lon;
        
    var weatherData = getweatherData(url);

    var currentTemp = weatherData.main.temp;
    var highTemp = weatherData.main.temp_max;
    var windSpeed = weatherData.wind.speed;
    var current = weather[0].description;
    var mugginess = weatherData.main.humidity; 
    /*
        - create array containing ids of forecast days
        - if current period (0) isDaytime = true:
            - foreach in id array:
                - for (int i; i %2 == 0; i += 1)
                -innerHTML = ¿¿¿stringSplit???(
                    weatherData.properties.periods[i].shortForecast 
                    -> then)

    if (weatherData.properties.periods[0].isDaytime) {


    }*/

    document.getElementById("current").innerHTML= current;
    document.getElementById("temp").innerHTML =  currentTemp + "&#176 F";
    document.getElementById("wind-speed").innerHTML = windSpeed;
    
    if (currentTemp < 51 && windSpeed > 2 ){
        document.getElementById("wind-chill").innerHTML = 
        getWindChill(temp, windSpeed) + "&#176 F";
    }
    else {
        document.getElementById("wind-chill").innerHTML = "N/A";
    }

    // string split?

return;

}

function getWindChill(temp, windSpeed) {
    var windChill = 35.74 + 
    (0.6215 * parseInt(temp)) - (35.75 * (parseInt(windSpeed)**0.16)) 
    + (0.4275 * parseInt(temp) * (parseInt(windSpeed)**0.16))

    return Math.round(windChill);
}

function getWeather(url){
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function (jsonObject){
            console.table(jsonObject);
        })
}

// DEPRECATED/LEGACY CODE
// 
// function getweatherData(url){
//     // do {} while  ((response code) < 200 && (response code) > 299)

//     var noaaHTTP =new XMLHttpRequest();
//     var weatherData;
//     //noaaHTTP.addEventListener("load", callBack);
//     do{
//     noaaHTTP.open("GET", url, false);
//     noaaHTTP.send(null);
//     weatherData = JSON.parse(noaaHTTP.responseText);
//     }
//     while (weatherData.status < 200 || weatherData.status > 299);

//     return weatherData;
// }