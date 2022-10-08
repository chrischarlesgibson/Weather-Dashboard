("use strict");
// look at # 10 stu activity for bolier plate funtion to
// var usersContainer = document.getElementById("users");

//assigning variables to single day card classes
var singleCard = document.querySelector(".card");
var fiveCardDeck = document.querySelector(".card-deck");
// var singleCity = document.querySelector(".day-city-card");
// var singleIcon = document.querySelector(".day-city-icon");
// var singleTemp = document.querySelector(".day-city-temp");
// var singleWind = document.querySelector(".day-city-wind");
// var singleHumd = document.querySelector(".day-city-humd");

var cityName = document.getElementById("search-input");
var APIKey = "c5ad45b95de3366ffdd43c823c1307a9";

var searchButton = document.getElementById("search-button");

//empty city variable to store the city input into
var cityInput = "";

// function convertToCoordinates() {
//   var coordinates="http://api.openweathermap.org/geo/1.0/direct?q=" {city name},{state code},{country code}"&limit={limit}" "&appid=c5ad45b95de3366ffdd43c823c1307a9"
// }

var date = moment().format("Do-MMM-GGGG");

function getWeatherApi(cityName) {
  var cityCoordinates =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityInput +
    "&appid=c5ad45b95de3366ffdd43c823c1307a9";
  fetch(cityCoordinates)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var latitude = data[0].lat;
      var longitude = data[0].lon;
      var latLongCity =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&exclude=minutely,hourly&include=daily&appid=c5ad45b95de3366ffdd43c823c1307a9&units=imperial";
      fetch(latLongCity)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          displayforecast(data);
        });
    });
}

var displayforecast = function (data) {
  for (i = 0; i < 6; i++) {
    if (i === 0) {
      var singleCityName = document.createElement("h3");
      var singleCityIcon = document.createElement("img");
      var singleCityTemp = document.createElement("h3");
      var singleCityWind = document.createElement("h3");
      var singleCityHumd = document.createElement("h3");

      var iconCode = data.list[i].weather[0].icon;
      var iconCodeUrl =
        "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
      singleCityName.textContent = data.city.name + "  " + date;
      singleCityIcon.setAttribute("src", iconCodeUrl);
      singleCityTemp.textContent =
        "Temp:" + " " + data.list[i].main.temp + " " + "F";
      singleCityWind.textContent =
        "Wind:" + " " + data.list[i].wind.speed + " " + "MPH";
      singleCityHumd.textContent =
        "Humidity:" + " " + data.list[i].main.humidity + " " + "%";

      singleCard.append(singleCityName);
      singleCard.append(singleCityIcon);
      singleCard.append(singleCityTemp);
      singleCard.append(singleCityWind);
      singleCard.append(singleCityHumd);
    } else {
      x = i * 8 - 1;

      var newFiveDayCard = document.createElement("div");
      var fiveCityIcon = document.createElement("img");
      var fiveDayCityTemp = document.createElement("h3");
      var fiveDayCityWind = document.createElement("h3");
      var fiveDayCityHumd = document.createElement("h3");

      var iconCode = data.list[x].weather[0].icon;
      var iconCodeUrl =
        "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
      fiveCityIcon.setAttribute("src", iconCodeUrl);
      fiveDayCityTemp.textContent =
        "Temp:" + " " + data.list[x].main.temp + " " + "F";
      fiveDayCityWind.textContent =
        "Wind:" + " " + data.list[x].wind.speed + " " + "MPH";
      fiveDayCityHumd.textContent =
        "Humidity:" + " " + data.list[x].main.humidity + " " + "%";

      newFiveDayCard.append(fiveCityIcon);
      newFiveDayCard.append(fiveDayCityTemp);
      newFiveDayCard.append(fiveDayCityWind);
      newFiveDayCard.append(fiveDayCityHumd);
      fiveCardDeck.append(newFiveDayCard);
    }
  }
};
//   for (var i = 0; i < data.length; i++)
//     var username = document.createElement("h3");
//   username.textContent = data[i].login;
//   usersContainer.append(username);

//   var userUr1 = document.createElement("p");
//   userUr1.textContent = data[i].url;
//   usersContainer.append(userUr1);
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  cityInput = cityName.value.trim();

  console.log("button pressed");
  getWeatherApi(cityInput);
  displayforecast();
});
