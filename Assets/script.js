"use strict";
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
var city = "madison";

// function convertToCoordinates() {
//   var coordinates="http://api.openweathermap.org/geo/1.0/direct?q=" {city name},{state code},{country code}"&limit={limit}" "&appid=c5ad45b95de3366ffdd43c823c1307a9"
// }
function getWeatherApi() {
  var cityCoordinates =
    "https://api.openweathermap.org/geo/1.0/direct?q=%22" +
    city +
    "%22&appid=c5ad45b95de3366ffdd43c823c1307a9";
  fetch(cityCoordinates)
    .then(function (coordinates) {
      return coordinates.json();
    })
    .then(function (data) {
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

      //   for (var i = 0; i < data.length; i++)
      //     var username = document.createElement("h3");
      //   username.textContent = data[i].login;
      //   usersContainer.append(username);

      //   var userUr1 = document.createElement("p");
      //   userUr1.textContent = data[i].url;
      //   usersContainer.append(userUr1);
    });
}
searchButton.addEventListener("click", getWeatherApi);
getWeatherApi();
//
// need way to append data to html from the object that is returned from the api call and store them into varibles. -do this first for the single city search and then work on getting the search button to take in user input and appends single day foresat and then you do same for 5 day forcaset bc will be same idea
//lok into bootstrap cards for forecast display

//users inputs city name  and you need way to convert ot lat and long and then neter those values as varibales into you get api url.
// if data is an array or array of abjects then loop thru instanceof.this function is a boiler plate function just take out the append ans create and url to create the boiler plate template
//first thing you should do it call api and try to get data to show in console just to see that you can get data. you need to figure out what search parameters to use in url to get coorect data
//need to create account for api key. generate a key and copy and paste in api key part of url and

// search how to get user input from search bar and put in url string parameters

//one function for city dusplay single day forecast

//another function for 5 day foracst display using apia request
