const apiKey = "1d190598d4126f6d0f91d6424d85a254";
var units = "imperial";

function searchEventHandler(e) {
  e.preventDefault();
  let searchInput = document.querySelector("#searchInput");
  clearSearchResult();
  getLatLong(searchInput.value);
  searchInput.value = "";
}

function clearSearchResult() {
  document.getElementById("searchResults").innerText = "";
}

function getcurrentlocation() {
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      findposition,
      geolocationPositionError,
      options
    );
  } else {
    console.log("Geolocation is not supported by this browser"); //====================remove==console==log==before==deployement=================//
  }
}

function geolocationPositionError(errorCode) {
  console.log(
    "  geo location Position Error function ",
    errorCode.code,
    errorCode.message
  ); //====================remove==console==log==before==deployement=================//
}

function findposition(position) {
  console.dir(position); //====================remove==console==log==before==deployement=================//
  console.log(
    "  find position function ",
    " lat ",
    position.coords.latitude,
    " long ",
    position.coords.longitude
  ); //====================remove==console==log==before==deployement=================//
}

// Input : city name (eg. London); To make search more precise put the city's name, comma, 2-letter country code (ISO3166).  (eg. London,CA)
// Result : An array of objects with lattitude and longitudes properties

function getLatLong(name) {
  let url = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=4&appid=${apiKey}`;
  let coordArr = [];

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //   console.dir(data); //====================remove==console==log==before==deployement=================//
      if (!Array.isArray(data) || !data.length) {
        renderSearchError();
        return "error";
      }
      data.forEach((element, i) => {
        coordArr[i] = {
          lat: element.lat,
          lon: element.lon,
        };
      });
      getWeatherData(coordArr);
    });
}

// Input : object with parameters of lat and lon
// Return : Weather data as json

async function weatherApiCall(coordObj) {
  lat = coordObj.lat;
  lon = coordObj.lon;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  let response = await fetch(url);
  let json1 = await response.json();
  return json1;
}

// Input : weather data json recieved from API call in rew
// Return : Processed object with relevant data.

function parseWeatherData(json1) {
  let result = {
    cityName: json1.name,
    countryName: json1.sys.country,
    weatherIcon: json1.weather[0].icon,
    weatherDescription: json1.weather[0].description,
    tempUnits: units === "imperial" ? "&#8457;" : "&#8451;",
    temp: Math.floor(json1.main.temp),
    lon: json1.coord.lon,
    lat: json1.coord.lat,
  };
  return result;
}

function renderDropDownMenu(element) {
  var resultsEl = document.getElementById("searchResults");
  resultsEl.setAttribute("class", "visible");
  var resultEl = document.createElement("li");
  let data = parseWeatherData(element);
  resultEl.setAttribute("data-lat", `${data.lat}`);
  resultEl.setAttribute("data-lon", `${data.lon}`);
  resultEl.setAttribute("class", "dropdown result");
  let countryNameLC = data.countryName.toLowerCase();
  resultEl.innerHTML = `
    <span>${data.cityName}, ${data.countryName} <img width="20px" height="15px" src="https://openweathermap.org/images/flags/${countryNameLC}.png"></span>
    <span>${data.temp}${data.tempUnits}</span>
    <span> <img width ="50px" height = "50px" src="https://openweathermap.org/img/wn/${data.weatherIcon}@2x.png"> </span>
    <span>${data.lat}, ${data.lon}</span>
  `;
  resultsEl.appendChild(resultEl);
  resultsEl.addEventListener("click", updateWeatherCard);
}

async function updateWeatherCard(e) {
  var optionSelected = e.target;
  if (optionSelected.matches(".result")) {
    var coordObj = {
      lat: optionSelected.dataset.lat,
      lon: optionSelected.dataset.lon,
    };
    let result = await weatherApiCall(coordObj);
    let jsonresult = await result;
    let data = parseWeatherData(jsonresult);
    renderWeatherCard(data);
    clearSearchResult();
  }
}

function getWeatherData(coordArr) {
  let cities = [];
  coordArr.forEach((element, i) => {
    cities[i] = weatherApiCall(element);
  });

  Promise.all(cities).then((results) => {
    results.forEach((element) => {
      renderDropDownMenu(element);
    });
  });
}
