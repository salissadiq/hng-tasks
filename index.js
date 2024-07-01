const { lookup } = require('geoip-lite');
const express = require("express");
const app = express();

const PORT = process.env.PORT || 5050;

app.get("/", (request, response) => {
    response.redirect("/api/hello?visitor_name=Mark");
})

app.get("/api/hello", async(request, response) => {
    const client_id =
        request.headers["x-forwarded-for"] ||
        request.connection.remoteAddress;
    console.log(lookup(client_id));
    const location = lookup(client_id)?.city;
    const visitor_name = request?.query?.visitor_name || "Mark"
    response.jsonp({
        client_id,
        location,
        greeting: `Hello, ${visitor_name}`, 
    })
})

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));