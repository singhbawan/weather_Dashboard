function test(e) {
  e.preventDefault();
  console.log("test function running");
}

//======================Sections=============//

function renderSearchError() {
  console.log(`Not found. To make search more precise put the city's name, comma, 2-letter country code (ISO3166).
    `);
  console.log(" render search error Function not ready");
}

//======================Sections=============//
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

  console.log("Function not ready");
}

//======================Sections=============//

function renderDropDownMenu(element) {
  var resultsEl = document.getElementById("searchResults");
  var resultEl = document.createElement("li");
  let data = parseWeatherData(element);
  let countryNameLC = data.countryName.toLowerCase();
  resultEl.innerHTML = `
  <span>${data.cityName}, ${data.countryName} <img src="https://openweathermap.org/images/flags/${countryNameLC}.png"></span>
  <span>${data.temp}${data.tempUnits}</span>
  <span> <img src="https://openweathermap.org/img/wn/${data.weatherIcon}@2x.png"> </span>
  <span>${data.lat}, ${data.lon}</span>
`;
  resultsEl.appendChild(resultEl);
  console.log(" render Drop Down Menu Function not ready");
}

//======================Sections=============//
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

//======================Sections=============//

//======================Sections=============//
