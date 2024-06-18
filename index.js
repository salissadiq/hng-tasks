const express = require('express');
const app = express();
const port = process.env.PORT || 5050;

app.get('/', (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const greeting = `Hello, your IP is ${clientIp}`;

  res.json({
    ip: clientIp,
    greeting: greeting
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
