//to install express
const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');

//for heroku configuration
const port = process.env.Port || 3000;

var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});