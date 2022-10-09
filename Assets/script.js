("use strict");
//assigning variable to single day forecast card class
var singleCard = document.querySelector(".card");
//assigning variable to five day forecast card class
var fiveCardDeck = document.querySelector(".card-deck");
//assigning variable to input search element
var cityName = document.getElementById("search-input");
//assigning variable to search button
var searchButton = document.getElementById("search-button");

//variable to select the history button class
var historyButtons = document.querySelector(".btn-group-vertical");

//empty city variable to store the city input into
var cityInput = "";

//using moment js to get the current date and assigning it to variable date
var date = moment().format("L");

//making empty history variable to store search history into

// //making varibale for the date of each five day forecast card using moment js
// var day2 = moment().add(1, "days");
// console.log(day2);

var historyArray;

//function to fetch the open weather api based on what city the user searched for and then converting the data to coordinates becuase open weather only accepts corrdinates and not city names. then We do another fetch using the corrdinates and then we run theat data into the displayForecast function..|| means if history array is blank dont store into storage
function getWeatherApi(cityName) {
  historyArray = JSON.parse(localStorage.getItem("searched city")) || [];
  historyArray.push(cityInput);
  localStorage.setItem("searched city", JSON.stringify(historyArray));
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

//displayForecast function to loop through data we get from open weather and i===0 it will dynamically create a forecast card for the current day and if i>(8*3)-1 (8*3 becuase the data from open weather comes in 3 hour blocks so 8*3 is 24hrs)then it will dynamically generate cards for the next five days
var displayforecast = function (data) {
  for (i = 0; i < 6; i++) {
    if (i === 0) {
      var singleDayDate = document.createElement("h5");
      var singleCityName = document.createElement("h3");
      var singleCityIcon = document.createElement("img");
      var singleCityTemp = document.createElement("h3");
      var singleCityWind = document.createElement("h3");
      var singleCityHumd = document.createElement("h3");

      var iconCode = data.list[i].weather[0].icon;
      var iconCodeUrl =
        "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
      singleDayDate.textContent = date;
      singleCityName.textContent = data.city.name;
      singleCityIcon.setAttribute("src", iconCodeUrl);
      singleCityTemp.textContent =
        "Temp:" + " " + data.list[i].main.temp + " " + "F";
      singleCityWind.textContent =
        "Wind:" + " " + data.list[i].wind.speed + " " + "MPH";
      singleCityHumd.textContent =
        "Humidity:" + " " + data.list[i].main.humidity + " " + "%";

      singleCard.append(singleCityName);
      singleCard.append(singleDayDate);
      singleCard.append(singleCityIcon);
      singleCard.append(singleCityTemp);
      singleCard.append(singleCityWind);
      singleCard.append(singleCityHumd);
    } else {
      x = i * 8 - 1;

      var fiveDayDate = document.createElement("h6");
      var newFiveDayCard = document.createElement("div");
      var fiveCityIcon = document.createElement("img");
      var fiveDayCityTemp = document.createElement("h3");
      var fiveDayCityWind = document.createElement("h3");
      var fiveDayCityHumd = document.createElement("h3");

      var iconCode = data.list[x].weather[0].icon;
      var iconCodeUrl =
        "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
      fiveCityIcon.setAttribute("src", iconCodeUrl);
      fiveDayDate.textContent = moment().add(i, "d").format("L");
      fiveDayCityTemp.textContent =
        "Temp:" + " " + data.list[x].main.temp + " " + "F";
      fiveDayCityWind.textContent =
        "Wind:" + " " + data.list[x].wind.speed + " " + "MPH";
      fiveDayCityHumd.textContent =
        "Humidity:" + " " + data.list[x].main.humidity + " " + "%";
      newFiveDayCard.append(fiveDayDate);
      newFiveDayCard.append(fiveCityIcon);
      newFiveDayCard.append(fiveDayCityTemp);
      newFiveDayCard.append(fiveDayCityWind);
      newFiveDayCard.append(fiveDayCityHumd);
      fiveCardDeck.append(newFiveDayCard);
    }
  }
};

// function deleteChildhistory
//function to storage searched for cities into local storage and put them on the page as buttons so they can be clicked again.

function makeCityHistoryBtns() {
  historyArray = JSON.parse(localStorage.getItem("searched city")) || [];
  console.log(historyArray);
  for (var i = 0; i < historyArray.length; i++) {
    var searchHistoryBtn = document.createElement("button");
    searchHistoryBtn.setAttribute("type", "button");
    searchHistoryBtn.setAttribute("aria-controls", "today forecast");
    searchButton.classList.add("history-btn", "btn-history");

    searchHistoryBtn.setAttribute("data-search", historyArray[i]);
    searchHistoryBtn.textContent = historyArray[i];
    historyButtons.append(searchHistoryBtn);
  }
}
//event listener for clicking the search buttion. this is where the displayforecast and getweather api functions are called
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  cityInput = cityName.value.trim();
  console.log("button pressed");
  getWeatherApi(cityInput);
  displayforecast();
});

function searchHistoryClick(e) {
  if (!e.target.matches(".btn-history")) {
    return;
  }
  var btn = e.target;
  var search = btn.getAttribute("data-search");
  console.log(search);
}

// searchHistoryBtn.addEventListener("click", "data-search", function (event) {
//   event.preventDefault();
//   searchHistoryBtn.textContent = historyArray[i];
//   console.log("button pressed");
//   getWeatherApi(historyArray[i]);
//   displayforecast();
// });

makeCityHistoryBtns();

// let chars = ["A", "B", "A", "C", "B"];
// let uniqueChars = [...new Set(chars)];
// console;

historyButtons.addEventListener("click", searchHistoryClick);
