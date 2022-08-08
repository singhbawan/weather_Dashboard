const apiKey = "1d190598d4126f6d0f91d6424d85a254";
var units = "imperial";

function searchEventHandler(e) {
  e.preventDefault();
  let searchInput = document.querySelector("#searchInput");
  getLatLong(searchInput.value);
  searchInput.value = "";
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

      console.log("value sent from getLatLong Function", coordArr);
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
