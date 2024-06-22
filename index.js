const express = require("express");
const app = express();

const PORT = process.env.PORT || 5050;

app.get("/", (request, response) => {
    response.redirect("/api/hello?visitor_name=Mark");
})

app.get("/api/hello", async(request, response) => {
    const client_id =
        request.headers["x-real-ip"] || 
        request.headers["x-forwarded-for"] ||
        request.socket.localAddress;
    
    const visitor_name = request.query?.visitor_name || "Mark"
        console.log(response.location());
    response.jsonp({
        client_id,
        greeting: `Hello, ${visitor_name}`, 
    })

})

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));