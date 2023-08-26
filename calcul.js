const fs = require('fs');
fs.readFileSync('input.txt', 'utf8', (err, data) => {
      if (err) {
            console.error('Error reading file:', err);
            return;
          }
          console.log('File contents:', data);
        //   const text =  response.json();
        
        });
        
        // async function lol(){a
        //     try {
        //         const response = await fetch("input.txt");
        //         if (!response.ok) {
        //             throw new Error(`Error loading input.txt: ${response.statusText}`);
        //         }
                
        //         const text =  response.json();
        //         // let cities = JSON.parse(text);
                
        //         // console.log(cities);
        //         return text;
                
        //         // Display the cities array
                
        //         // outputDiv.textContent = JSON.stringify(cities, null, 2);
        //     } catch (error) {
        //         console.error("An error occurred:", error);
        //     }
            
        // }
        // const cities = [
        //     { name: "New York", lat: 40.7128, lng: -74.006 },
        //     { name: "London", lat: 51.5074, lng: -0.1278 },
        //     { name: "Paris", lat: 48.8566, lng: 2.3522 },
        //     { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
        //     { name: "Sydney", lat: -33.8651, lng: 151.2099 },
        //     { name: "Rome", lat: 41.9028, lng: 12.4964 },
        //     { name: "Cairo", lat: 30.0444, lng: 31.2357 },
        //     { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729 },
        //     { name: "Dubai", lat: 25.2048, lng: 55.2708 },
        //     { name: "Rabat", lat: 34.0209, lng: -6.8416 },
        //   ];



        async function lol() {
            try {
                const response = await fetch("input.txt");
              if (response.ok) {
                const content = await response.text();
                const parsedData = JSON.parse(content);
                return parsedData;
              }
              throw new Error("error");
            } catch (error) {
              console.error(error);
            }
          }


        
        
        let cityF = lol();
        
        console.log(cityF);
function selectRandomCity(cities) {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cityF[randomIndex];
}

let city = selectRandomCity(cityF);
let temp;
let tab;
async function bringj(city_arg) {
  try {
    const latitude = city_arg.lat;
    const longitude = city_arg.lng;

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    if (response.ok) {
      return response.json();
    }
    throw new Error("error");
  } catch (error) {
    console.error(error);
  }
}
// console.log(city.name);

const cityName = city.name;
let allData;

// let selectedCity = selectRandomCity(cities)
// bringj(selectedCity).then(data => allData = data)
const cityNameElement = document.querySelector(".cityName");
const temperatureElement = document.querySelector(".cityTemperature");
const allDataElement = document.querySelector(".allData");
const changeCityButton = document.querySelector(".changeCity");
const showAllButton = document.querySelector(".showall");
const closeBtn = document.querySelector(".closeBtn");

changeCityButton.addEventListener("click", () => {
  selectedCity = selectRandomCity(cityF);
  //   console.log("Data:", data);
  //   const tempera = data.current_weather.temperature;
  //   temp = tempera;
  bringj(selectedCity)
    .then((data) => {
      allData = data;
      return allData;
    })
    .then((res) => {
      //   console.log(res);
      cityNameElement.textContent = selectedCity.name;
      temperatureElement.textContent = res.current_weather.temperature;

      const tableContainer1 = document.querySelector(".tableContainer1");
      tab = JSON.stringify(allData);
      tab = allData;
      const table1 = createTableFromData(tab);
      tableContainer1.appendChild(table1);
      console.log("all data : " + tab);
    });
});

showAllButton.addEventListener("click", () => {
  //   bringj(selectedCity).then(data => allData = data);
  allDataElement.textContent = JSON.stringify(allData);
  allDataElement.style.display = "inline";
  console.log(allData);
});
closeBtn.addEventListener("click", () => {
  allDataElement.style.display = "none";
});

//   const data = [
//     { name: "John", age: 30, city: "New York" },
//     { name: "Jane", age: 25, city: "Los Angeles" },
//     { name: "Bob", age: 40, city: "Chicago" }
//   ];

function createTable(data) {
  const table = document.createElement("table");
  const thead = table.createTHead();
  const tbody = table.createTBody();
  const headerRow = thead.insertRow();

  for (const key in data[0]) {
    const th = document.createElement("th");
    th.textContent = key.toUpperCase();
    headerRow.appendChild(th);
  }

  data.forEach((item) => {
    const row = tbody.insertRow();
    for (const key in item) {
      const cell = row.insertCell();
      cell.textContent = item[key];
    }
  });

  return table;
}

const tableContainer = document.querySelector(".tableContainer");
const table = createTable(cities);
tableContainer.appendChild(table);

function createTableFromData(data) {
  const table = document.createElement("table");
  const thead = table.createTHead();
  const tbody = table.createTBody();
  const headerRow = thead.insertRow();

  for (const key in data.current_weather) {
    const th = document.createElement("th");
    th.textContent = key.toUpperCase();
    headerRow.appendChild(th);
  }

  const currentWeatherData = data.current_weather;
  const row = tbody.insertRow();
  for (const key in currentWeatherData) {
    const cell = row.insertCell();
    cell.textContent = currentWeatherData[key];
  }

  return table;
}
console.log(JSON.stringify(cityF, null, 2));
