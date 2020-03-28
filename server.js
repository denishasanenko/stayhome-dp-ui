const express = require('express');
const path = require('path');
const port = process.env.PORT || 4004;
const app = express();
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
    return res.send('pong');
});
app.get('/env.js', function (req, res) {
    return res.send(`var ENV_VARS = ${JSON.stringify({host: process.env.API_HOST || 'https://stayhome-dp.herokuapp.com'})}`);
});
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);
