const { lookup } = require('geoip-lite');
const express = require("express");
const app = express();  


const PORT = process.env.PORT || 5050;

app.get("/", async(request, response) => {
    response.redirect("/api/hello?visitor_name=Mark");
})

app.get("/api/hello", async(request, response) => {
    const client_ip =
        request.headers["x-forwarded-for"] ||
        request.connection.remoteAddress;
    const location = lookup(client_ip)?.city;
    console.log(client_ip);
    const weather = await getWeatherInfo("Katsina");
    const visitor_name = request?.query?.visitor_name || "Mark"

    response.jsonp({
        client_id,
        location,
        greeting: `Hello, ${visitor_name}!, the temperature is ${weather?.main?.temp} degrees Celcius in ${location}`, 
    })
})

async function getWeatherInfo(location) {
    const apiKey = "10bb9032f3770e94fcc78b7779c1dd9d"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${apiKey}`;
    try {
        const response = await fetch(url);
        return await    response.json()
    } catch (error) {
        console.log(error)
    }

}   
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));