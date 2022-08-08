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
  console.log(" render Drop Down Menu Function not ready");
  console.log("Name of place ", element.name);
  console.log("Country Name : ", element.sys.country);
}

//======================Sections=============//

//======================Sections=============//

//======================Sections=============//
