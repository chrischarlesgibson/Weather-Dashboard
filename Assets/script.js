("use strict");
// look at # 10 stu activity for bolier plate funtion to
// var usersContainer = document.getElementById("users");

//assigning variables to single day card classes
var singleCard = document.querySelector(".day-card-body");
var singleCity = document.querySelector(".day-city-card");
var singleIcon = document.querySelector(".day-city-icon");
var singleTemp = document.querySelector(".day-city-temp");
var singleWind = document.querySelector(".day-city-wind");
var singleHumd = document.querySelector(".day-city-humd");
var cityName = document.getElementById("search-input");
var APIKey = "c5ad45b95de3366ffdd43c823c1307a9";

var searchButton = document.getElementById("search-button");

//empty city variable to store the city input into
cityName = "madison";

// function convertToCoordinates() {
//   var coordinates="http://api.openweathermap.org/geo/1.0/direct?q=" {city name},{state code},{country code}"&limit={limit}" "&appid=c5ad45b95de3366ffdd43c823c1307a9"
// }
function getWeatherApi(cityName) {
  var cityCoordinates =
    "https://api.openweathermap.org/geo/1.0/direct?q=%22" +
    cityName +
    "%22&appid=c5ad45b95de3366ffdd43c823c1307a9";
  fetch(cityCoordinates)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      var latitude = data[0].lat;
      var longitude = data[0].lon;
      var latLongCity =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=c5ad45b95de3366ffdd43c823c1307a9";
      fetch(latLongCity)
        .then(function (weather) {
          return weather.json();
        })
        .then(function (finalWeather) {
          console.log(finalWeather);
        });
    });
}

// var displaySingleDay = function (singleDay) {};

//   for (var i = 0; i < data.length; i++)
//     var username = document.createElement("h3");
//   username.textContent = data[i].login;
//   usersContainer.append(username);

//   var userUr1 = document.createElement("p");
//   userUr1.textContent = data[i].url;
//   usersContainer.append(userUr1);
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("button pressed");
  getWeatherApi(cityName);
});
