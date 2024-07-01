require('dotenv').config()
const { lookup } = require("geoip-lite");
const geoIp2 = require('geoip-lite2');  
const express = require("express");
const app = express();  

const PORT = process.env.PORT || 5050;

app.get("/", async(request, response) => {
    response.redirect("/api/hello?visitor_name=Mark");
})

app.get("/api/hello", async(request, response) => {
    const client_ip =
        request.headers["x-forwarded-for"] ||
        request.socket.remoteAddress;
    const location = geoIp2.lookup(client_ip)?.city ? geoIp2.lookup(client_ip)?.city : lookup(client_ip)?.city;

    const weather = await getWeatherInfo(location);
    const visitor_name = request?.query?.visitor_name || "Mark"

    response.jsonp({
        client_ip,
        location,
        greeting: `Hello, ${visitor_name}!, the temperature is ${weather?.main?.temp || "Can't get city"} degrees Celcius in ${location}`, 
    })
})

async function getWeatherInfo(location) {
    const apiKey = process.env.API_KEYS
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${apiKey}`;
    try {
        const response = await fetch(url);
        return await    response.json()
    } catch (error) {
        console.log(error)
    }

}   
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));