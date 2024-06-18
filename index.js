const express = require("express");
const ip = require("ip");
const app = express();
const PORT = process.env.PORT || 5050;

app.get("/", (request, response) => {
    const clientIP = ip.address("" || "public" || "private");
    response.jsonp({
        ip: clientIP,
        greeting: `Hello Salscodes your IP adress is ${clientIP}`,
    })
})          

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));