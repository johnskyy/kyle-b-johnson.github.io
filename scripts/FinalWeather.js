// Preston coord: 42.0962, -111.8766
// Fish Haven coords:  42.0370, -111.3959 
// Soda Springs coords: 42.6547, -111.6037

// Get today's date
var timeNow = new Date();

async function getWeather() {
    var lat = 20.492725989580325;
    var lon = -86.96527955765865;

    var arrayOfNoParticularInterest = ["35e5e",
    "c2637","59a31","2d3","f805a","ecf9","76efa"];

    var stringOfNoParticularInterest = "";

    for (i of arrayOfNoParticularInterest )
        stringOfNoParticularInterest += i;

    var url = "https://api.openweathermap.org/data/2.5/onecall?"
    + "&units=imperial" + "&appid=" + stringOfNoParticularInterest
        + "&lat="+ lat + "&lon=" + lon +"&exclude=minutely,hourly";
    
    var weatherData = await getWeatherData(url);

    let card = document.createElement('div');
    let dayText = document.createElement('h3');
    let weatherImg = document.createElement('img');
    let currentTemp = document.createElement('p');
    let current = document.createElement('p');
    let mugginess = document.createElement('p');

    dayText.textContent = "Current Conditions";
    weatherImg.setAttribute('src', "http://openweathermap.org/img/wn/" 
    + weatherData.current.weather[0].icon + "@2x.png");
    currentTemp.textContent = weatherData.current.temp + "° F";
     current.textContent = makeCorrectCapital(weatherData.current.weather[0].description); 
     mugginess.textContent = weatherData.current.humidity + "% humidity"; 

    card.appendChild(dayText);
    card.appendChild(weatherImg);
    card.appendChild(currentTemp);
    card.appendChild(current);
    card.appendChild(mugginess);

    document.querySelector('div#CurrentWeather').appendChild(card);

    updateForecast(weatherData);

    return;

}

function updateForecast(currentData) {
    
    // Get temps for respective days at specified time window
    var forecastTemps = [];

    // Get weather summary for respective days at specified time window
    var forecastText = [];

    // Get openWeather API forecast images
    var forecastImgs = [];

    var forecastDays = getForecastDays();

    for(var i = 0; i < 4; i++){
        forecastImgs[i] = "http://openweathermap.org/img/wn/" 
            + currentData.daily[i].weather[0].icon + "@2x.png";
    }

    // Loops through each of the arrays for the proper values
    for(var i = 0; i < 4; i++){
        let card = document.createElement('section');
        let info = document.createElement('div');
        let dayText = document.createElement('h3');
        let weatherImg = document.createElement('img');
        let hiTemp = document.createElement('p');
        let current = document.createElement('p');

        dayText.textContent = forecastDays[i];
        weatherImg.setAttribute('src',forecastImgs[i]);
        current.textContent = makeCorrectCapital(currentData.daily[i].weather[0].description);
        hiTemp.textContent = currentData.daily[i].temp.day + "° F";

        card.appendChild(info);
        info.appendChild(dayText);
        info.appendChild(weatherImg);
        info.appendChild(hiTemp);
        info.appendChild(current);
        document.querySelector('div#Weather').appendChild(card);
    }
        
    return;
}


function getForecastDays(){
    // Store day names in easily accessible array
    var forecastDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // Initialize the current day of the week as index value
    var forecastDayIndex = timeNow.getDay();

    var forecastDayList = [];
    forecastDayList[0] = "Today";

    for(var i = 1; i < 4; i++){
        forecastDayList[i] = forecastDays[(forecastDayIndex + (i -1) ) % 7];
    }

    return forecastDayList;
}


function getForecastText(currentData, forecastData, dataIndex){

    var forecastInfo = [];

    // Assigns current weather description in the event that 
    // the forecast data starts after 6PM of the current day
    forecastInfo[0] = makeCorrectCapital( currentData.weather[0].main);

    for(var i = 0; i < 5; i++){
        if (dataIndex[i] != -1)
            forecastInfo[i] = 
            makeCorrectCapital(forecastData.list[dataIndex[i]].weather[0].main);
    }

    return forecastInfo;
}

function getForecastImg(currentData){

    var forecastImgs = [];


    for(var i = 0; i < 5; i++){
        forecastImgs[i] = currentData.daily[i].weather[0].icon;
    }

    return forecastImgs;
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