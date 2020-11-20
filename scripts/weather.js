// Preston coord: 42.0962, -111.8766
// Fish Haven coords:  42.0370, -111.3959 
// Soda Springs coords: 42.6547, -111.6037



async function getWeather(town) {
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

    var arrayOfNoParticularInterest = ["35e5e",
    "c2637","59a31","2d3","f805a","ecf9","76efa"];

    var stringOfNoParticularInterest = "";

    for (i of arrayOfNoParticularInterest )
        stringOfNoParticularInterest += i;

    var url = "https://api.openweathermap.org/data/2.5/weather?"
    + "&units=imperial" + "&appid=" + stringOfNoParticularInterest
        + "&lat="+ lat + "&lon=" + lon;
        
    var weatherData = await getWeatherData(url);

    var currentTemp = weatherData.main.temp;
    var highTemp = weatherData.main.temp_max;
    var windSpeed = weatherData.wind.speed;
    var current = weatherData.weather[0].description;
    current = current[0].toUpperCase() + current.substring(1);
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
    document.getElementById("wind-speed").innerHTML = windSpeed + " mph";
    document.getElementById("mugginess").innerHTML = mugginess + "%";

    if (currentTemp < 51 && windSpeed > 2 ){
        document.getElementById("wind-chill").innerHTML = 
        getWindChill(currentTemp, windSpeed) + "&#176 F";
    }
    else {
        document.getElementById("wind-chill").innerHTML = "N/A";
    }

    // string split?

    updateForecast(lat, lon, stringOfNoParticularInterest);

return;

}

/**
 * 
 * @param {float} lat 
 * @param {float} lon 
 * @param {String} unimportantString 
 */

async function updateForecast(lat, lon, unimportantString) {

    // Get today's date
    var timeNow = new Date();

    // Store day names in easily accessible array
    var forecastDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // Initialize the current day of the week as index value
    var forecastDayIndex = timeNow.getDay();

    // Create names of days on top of each forecast day
    for(var i = 1; i < 6; i++){
        document.querySelector("#day"+i+">.dayOfWeek").innerHTML 
            = forecastDays[(forecastDayIndex + (i -1) ) % 7]
        var forecastTempSelectorString = "#day" + i + ">.forecastTemp";
        document.querySelector(forecastTempSelectorString).innerHTML = "Updating...";
    }
    
    // Concatenate url to retrieve forecast data
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?"
    + "&units=imperial" +"&lat=" + lat +"&lon=" + lon + "&appid=" 
    + unimportantString;

    // Fetch forecast data
    var forecastData = await getWeatherData(forecastURL);
    
    // Concatenate url to retrieve current day's data
    var currentURL = "https://api.openweathermap.org/data/2.5/weather?"
    + "&units=imperial" + "&appid=" + unimportantString
        + "&lat="+ lat + "&lon=" + lon;

    // Fetch current day data
    var currentData = await getWeatherData(currentURL);

    // Initialize array to hold forecast temps
    var forecastTemps = [];

    // Get "today's" high temp from the current day data
    forecastTemps[1] = currentData.main.temp_max;


    var forecastDayObjectIndices = [];

    var forecastInfo = [];




for(var i = 0; i < 8; i++) {
    // Get time of first (0th) forecast period
    var firstForecastDate = new Date(forecastData.list[i].dt_txt);

    // Only use forecasts for the 1800 hour period
    if(firstForecastDate.getHours() == 18) {
        // Compare today's date with date of forecast api period 0
        if(forecastDayIndex < firstForecastDate.getDay()) {
            forecastDayObjectIndices[0] = null;
            forecastDayObjectIndices[1] = 0;
            for(var j = 2; i <6; i++) {
                forecastDayObjectIndices[j] = (8*j) + i;
            }
        } 
        // Compare today's date with date of forecast api period 0
        else if (forecastDayIndex == firstForecastDate.getDay()){
            forecastDayObjectIndices[0] = 0;
            for(var j = 1; i <6; i++) {
                forecastDayObjectIndices[i] = (8*i) + i;
            }
        }
    } 
}

for(var i = 1; i < 6; i++){
    var forecastListIndex = forecastDayObjectIndices[i-1]; 
    if(forecastListIndex != null) {
        var forecastTempSelectorString = "#day" + i + ">.forecastTemp";
        
        document.querySelector(forecastTempSelectorString).innerHTML 
            = forecastData.list[forecastListIndex].main.temp;
        document.querySelector("#day"+i+">.forecastSummary").innerHTML 
            = forecastData.list[forecastListIndex].weather[0].main;
    }
    else {
        document.querySelector("#day"+i+">.forecastSummary").innerHTML 
            = currentData.weather[0].description;

    }    
}

    return;
}

function getWindChill(temp, windSpeed) {
    var windChill = 35.74 + 
    (0.6215 * parseInt(temp)) - (35.75 * (parseInt(windSpeed)**0.16)) 
    + (0.4275 * parseInt(temp) * (parseInt(windSpeed)**0.16))

    return Math.round(windChill);
}

function getWeatherData(url){
    return fetch(url)
        .then(function(response){
            return response.json();
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