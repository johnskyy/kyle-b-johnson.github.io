// Preston coord: 42.0962, -111.8766
// Fish Haven coords:  42.0370, -111.3959 
// Soda Springs coords: 42.6547, -111.6037

// Get today's date
var timeNow = new Date();

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
        
     // Concatenate url to retrieve forecast data
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?"
    + "&units=imperial" + "&lat=" + lat + "&lon=" + lon + "&appid=" 
    + stringOfNoParticularInterest;

    var weatherData = await getWeatherData(url);

    // Fetch forecast data
    var forecastData = await getWeatherData(forecastURL);

    var currentTemp = weatherData.main.temp;
    var highTemp = weatherData.main.temp_max;
    var windSpeed = weatherData.wind.speed;
    var current = makeCorrectCapital(weatherData.weather[0].description); 
    var mugginess = weatherData.main.humidity; 


    document.getElementById("current").innerHTML= current;
    document.getElementById("temp").innerHTML =  currentTemp + "&#176 F";
    document.getElementById("wind-speed").innerHTML = windSpeed + " mph";
    document.getElementById("mugginess").innerHTML = mugginess + "%";
    document.getElementById("wind-chill").innerHTML = getWindChill(currentTemp,windSpeed); 

    // string split?

    updateForecast(weatherData, forecastData);

    return;

}

function updateForecast(currentData, forecastData) {
    
    //Update days of week to correct names
    updateForecastDays(); 

    // Get index of proper forecast time window values
    var dataIndex = getDataIndex(forecastData);
    
    // Get temps for respective days at specified time window
    var forecastTemps = getForecastTemps(currentData,forecastData,dataIndex);

    // Get weather summary for respective days at specified time window
    var forecastText = getForecastText(currentData,forecastData,dataIndex);

    // Get openWeather API forecast images
    var forecastImgs = getForecastImg(currentData,forecastData, dataIndex);

    var forecastImgURL = [];

    for(var i = 0; i < 5; i++){
        forecastImgs[i] = "http://openweathermap.org/img/wn/" 
            + forecastImgs[i] + "@2x.png";
    }

    // Loops through each of the arrays for the proper values
    for(var i = 1; i < 6; i++){
        document.querySelector("#day" + i + ">.forecastTemp").innerHTML 
            = forecastTemps[i-1] + "&#176 F";
        document.querySelector("#day"+i+">.forecastSummary").innerHTML 
            = forecastText[i-1]; 
        document.querySelector("#day"+i+">img").setAttribute(
            'src', forecastImgs[i-1] );
    }

    document.querySelectorAll("#forecast-imgs img")
    .forEach((el) => (el.style.backgroundColor = "#658361"));
        
    return;
}


function updateForecastDays(){
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
}

function getDataIndex(forecastData){

    // Initialize the current day of the week as index value
     var forecastDayIndex = timeNow.getDay();


    var forecastDayObjectIndices = [];

    // Compare and compute correct forecast data periods, 
    // must be within the first 8 entries of the forecast data JSON object
    for(var i = 0; i < 8; i++) {
        // Get time of first (i-th) forecast period
        var forecastPeriodDate = new Date(forecastData.list[i].dt_txt);
        var forecastPeriodDay = forecastPeriodDate.getDay();

        // Only use forecasts for the 1800 hour period
        if(forecastPeriodDate.getHours() == 18) {
            // Compare today's date with date of forecast api period 0
            if(forecastDayIndex < forecastPeriodDay) {
                forecastDayObjectIndices[0] = -1;
                forecastDayObjectIndices[1] = 0;
                for(var j = 2; j < 5; j++) {
                    forecastDayObjectIndices[j] = (8*j) - 1;
                }
        } 
        // Compare today's date with date of forecast api period 0
        else if (forecastDayIndex == forecastPeriodDate.getDay()){
                forecastDayObjectIndices[0] = 0;
                for(var j = 1; i < 5; i++) 
                    forecastDayObjectIndices[j] = (8*j) + i;
            }
        } 
    }

    return forecastDayObjectIndices;
}

function getForecastTemps(currentData, forecastData, dataIndex){
    // Initialize array to hold forecast temps
    var forecastTemps = [];

    // Get "today's" high temp from the current day data
    forecastTemps[0] = Math.round(currentData.main.temp_max);

    for(var i = 0; i < 5; i++){
        if (dataIndex[i] != -1)
            forecastTemps[i] = Math.round(
                forecastData.list[dataIndex[i]].main.temp);
    }

    return forecastTemps;
}

function getForecastText(currentData, forecastData, dataIndex){

    var forecastInfo = [];

    // Assigns current weather description in the event that 
    // the forecast data starts after 6PM of the current day
    forecastInfo[0] =makeCorrectCapital( currentData.weather[0].main);

    for(var i = 0; i < 5; i++){
        if (dataIndex[i] != -1)
            forecastInfo[i] = 
            makeCorrectCapital(forecastData.list[dataIndex[i]].weather[0].main);
    }

    return forecastInfo;
}

function getForecastImg(currentData, forecastData, dataIndex){

    var forecastImgs = [];

    // Assigns current weather description in the event that 
    // the forecast data starts after 6PM of the current day
    forecastImgs[0] = currentData.weather[0].icon;

    for(var i = 0; i < 5; i++){
        if (dataIndex[i] != -1)
            forecastImgs[i] = forecastData.list[dataIndex[i]].weather[0].icon;
    }

    return forecastImgs;
}

function getWindChill(temp, windSpeed) {
    var windChill;

    if (temp < 51 && windSpeed > 2 ){
        windChill = Math.round(35.74 + 
        (0.6215 * parseInt(temp)) - (35.75 * (parseInt(windSpeed)**0.16)) 
        + (0.4275 * parseInt(temp) * (parseInt(windSpeed)**0.16)));
        windChill = windChill.toString() + "&#176 F";
    }
    else {
        windChill = "N/A";
    }

    

    return windChill;
}

function getWeatherData(url){
    return fetch(url)
        .then(function(response){
            return response.json();
        })
        
}

/**
 * 
 * @param {String} stringToCorrect 
 */
function makeCorrectCapital(stringToCorrect){
    return stringToCorrect[0].toUpperCase() 
        + stringToCorrect.substring(1);
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