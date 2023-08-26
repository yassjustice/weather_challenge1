// import querystring from 'querystring';
// import { creating } from './createfile.js'
// const creating = require('./createfile.js');
const querystring = require("querystring");
const http = require("http");
// const fs = require("fs");
const url = require(`url`);

// creating();

let latitude;
let longitude;

const server = http.createServer((req, res) => {
  // Request handling logic goes here
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  if (path === "/weather") {
    // Handle the '/users' endpoint
    const city = querystring.parse(parsedUrl.query.city);

    const keys = Object.keys(city);
    const cityKey = keys[0];

    console.log(cityKey);

    const cities = [
      { name: "New York", lat: 40.7128, lng: -74.006 },
      { name: "London", lat: 51.5074, lng: -0.1278 },
      { name: "Paris", lat: 48.8566, lng: 2.3522 },
      { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
      { name: "Sydney", lat: -33.8651, lng: 151.2099 },
      { name: "Rome", lat: 41.9028, lng: 12.4964 },
      { name: "Cairo", lat: 30.0444, lng: 31.2357 },
      { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729 },
      { name: "Dubai", lat: 25.2048, lng: 55.2708 },
      { name: "Rabat", lat: 34.0209, lng: -6.8416 },
    ];
    for (const i of cities) {
      if (i.name === cityKey) {
        latitude = i.lat;
        longitude = i.lng;
        console.log(latitude + " " + longitude);
        break; // Exit loop once the city is found
      }
      else {
        latitude = undefined;
        longitude = undefined;
      }
    }

    // here I will put the async function later
    async function bringj() {
      try {
        const risala = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );

        if (risala.ok) {
          return risala.json();
        }
        throw new Error("error");
      } catch (error) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.write(`<h1>Error</h1>`);
        res.write(`<p>${error.message}</p>`);
        res.end();
        // console.error(error);
      }
    }
    bringj().then((results) => {
      let bringdata = results;
    //   console.log(bringdata);
      if (typeof latitude !== "undefined" && typeof longitude !== "undefined") {
        // return JSON.stringify(bringdata);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`<h1 >${cityKey}</h1>`);
        res.write(`<h2 >${bringdata.current_weather.temperature}</h2>`);
        res.write(`<p >${JSON.stringify(bringdata)}</p>`);
        res.end("I am a list of products :p");
      } else {
        // City not found, send error response
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write("<h1>Error</h1>");
        res.write("<p>City not found</p>");
        res.end();
      }
      return bringdata;
    });
  } else {
    // Handle unknown endpoints
    // res.writeHead(404, { "Content-Type": "text/html" });
    // res.write("<h1>404 Not Found</h1>");
    // res.end();
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

process.on('uncaughtException', (error) => {
    console.error("Uncaught exception occurred:", error);
    // You can do cleanup or graceful shutdown here
  });