const express = require("express");
const app = express();

const PORT = process.env.PORT || 5050;

app.get("/", (request, response) => {
    const clientIP =
        request.headers["x-real-ip"] || 
        request.headers["x-forwarded-for"] ||
        request.socket.localAddress;
    response.jsonp({
        ip: clientIP,
        greeting: `Hello Salscodes your IP adress is: [${clientIP}]`,
    })
})

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));