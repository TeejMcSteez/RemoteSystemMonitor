const fs = require('node:fs'); // DOC: https://nodejs.org/api/fs.html
const path = require('node:path'); // DOC: https://nodejs.org/api/path.html
const fileManager = require('./readFiles.js');
const express = require("express");
const server = express();


const hostname = 'localhost';
const port = 3000;
const CPU_TEMPERATURE_DIRECTORY = "/sys/class/hwmon/hwmon2"; // CPU Temp Directory
const MOTHERBOARD_DIRECTORY = "/sys/class/hwmon/hwmon3"; // Motherboard IO Directory

// TODO:
// access temperature information with fs and path and log it
// take the logged data and output it to and HTML page 
// and then serve the html (and css) locally with http.Server http module
// Also display other information if possible such as certain log files as well
// as system errors and availible memory etc.

// DO more research on how to properly manage html on the backend so you can edit the html properly and load for the client properly. 

async function loadHTMLValues() {
    let folderContents = fileManager.readFolder(CPU_TEMPERATURE_DIRECTORY);
    let labels = []; // Contains all the filenames of readings
    folderContents.forEach(filename => {
        labels.push({filename});
    });
    let readings = [] // Stores labels with there values
    labels.forEach(label => {
        readings.push({NAME: label.LABEL, VALUE:fileManager.findTemperatureValues(label.LABEL)});
    });
}

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

server.get('api/data')

server.listen(port, () => console.log(`Server listening on port: http://${hostname}:${port}`));