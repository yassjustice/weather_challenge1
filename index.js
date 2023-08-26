const fs = require("fs");

function readCitiesFromFile() {
return new Promise((resolve, reject) => {
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File contents:", data);
  resolve(data);
});
});
}

async function bringj(city_arg) {
    try {
      
    
      // const cityName = city.name;
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

async function selectRandomCity() {
    try {
      const cityF = await readCitiesFromFile();
    //   console.log("File contents:", cityF);
      const randomIndex = Math.floor(Math.random() * cityF.length);
      
    //   bringj(cityF)
    // .then((data) => {
    //   allData = data;
    //   return allData;
    // })
    //   console.log(bringj(cityF));

        return  cityF[randomIndex];

      // Now you can work with the cityData array
    } catch (error) {
      console.error("Error:", error);
    }
  }


async function main(){
    let selected= await selectRandomCity()
    let bring = bringj(selected);
    console.log(bring);
}
main();
// console.log(selectRandomCity());

































// const cityNameElement = document.querySelector(".cityName");
// const temperatureElement = document.querySelector(".cityTemperature");
// const allDataElement = document.querySelector(".allData");
// const changeCityButton = document.querySelector(".changeCity");
// const showAllButton = document.querySelector(".showall");
// const closeBtn = document.querySelector(".closeBtn");

// changeCityButton.addEventListener("click", () => {

//     let cityF = readCitiesFromFile();
//     let selectedCity = selectRandomCity(cityF);
//     //   console.log("Data:", data);
//     //   const tempera = data.current_weather.temperature;
//     //   temp = tempera;
//     bringj(selectedCity)
//       .then((data) => {
//         allData = data;
//         return allData;
//       })
//       .then((res) => {
//         //   console.log(res);
//         cityNameElement.textContent = selectedCity.name;
//         temperatureElement.textContent = res.current_weather.temperature;
  
//         const tableContainer1 = document.querySelector(".tableContainer1");
//         tab = JSON.stringify(allData);
//         tab = allData;
//         const table1 = createTableFromData(tab);
//         tableContainer1.appendChild(table1);
//         console.log("all data : " + tab);
//       });
//   });