"use strict";

searchButton.addEventListener('click', searchWeather);

function searchWeather() {

    loadingText.style.display = 'block';
    weatherBox.style.display = 'none';
    var cityName = searchCity.value;
    if (cityName == 0) {
        return alert('Please enter a City Name');
    }
    var http = new XMLHttpRequest();
    var apiKey = 'd64bba3b1724c3a507c889ba6418ca33\n';
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;
    var method = 'GET';

    http.open(method, url);
    http.onreadystatechange = function () {
        if (http.readyState == XMLHttpRequest.DONE && http.status == 200) {
            var data = JSON.parse(http.responseText);
            var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
            weatherData.temperature = data.main.temp;
            updateWeather(weatherData);
        } else if (http.readyState == XMLHttpRequest.DONE && http.status !== 200) {
            alert('Somthing went wrong!');
        }
    };
    http.send();
}

function updateWeather(weatherData) {
    weatherCity.textContent = weatherData.cityName;
    weatherDescription.textContent = weatherData.description;
    weatherTemperature.textContent = weatherData.temperature;

    loadingText.style.display = 'none';
    weatherBox.style.display = 'block';
}