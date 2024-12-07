const fs = require('node:fs').promises; // DOC: https://nodejs.org/api/fs.html
const path = require('node:path'); // DOC: https://nodejs.org/api/path.html
const fileManager = require('./readFiles.js');
const express = require("express");
const server = express();
require('dotenv').config();


const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const CPU_TEMPERATURE_DIRECTORY = '/sys/class/hwmon/hwmon2'; // CPU Temp Directory
const MOTHERBOARD_DIRECTORY = "/sys/class/hwmon/hwmon3"; // Motherboard IO Directory

// TODO:
// access temperature information with fs and path and log it ✅
// take the logged data and output it to and HTML page ✅
// and then serve the html (and css) locally with express module ✅
// Also display other information if possible such as certain log files as well
// as system errors and availible memory etc.

// DO more research on how to properly manage html on the backend so you can edit the html properly and load for the client properly. 
server.use(express.static(path.join(__dirname, 'public')));

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
});


server.get('/api/temperatures', async (req, res) => {
    try {
        const contents = await fileManager.readFolder(CPU_TEMPERATURE_DIRECTORY);

        const tempFiles = fileManager.findTemperatureFiles(contents);

       const readingsPromise =  await Promise.all(tempFiles.map(file => fileManager.findValues(CPU_TEMPERATURE_DIRECTORY, file.LABEL)));

       const readings = await Promise.all(readingsPromise);

        // Prints ands sends each readings value as a json response
        console.log(`Readings:\n${readings}`);
        res.json(readings);

    } catch (error) {
        console.error(`Error fetching temperatures ${error.message}`);
        res.status(500).json({error: 'Could not fetch temperatures'});
    }
});

server.get('/api/motherboard', async (req, res) => {
    try {
        const contents = await fileManager.readFolder(MOTHERBOARD_DIRECTORY);

        const tempFiles = fileManager.findMotherboardFiles(contents);

        const readingsPromise = await Promise.all(tempFiles.map(file => fileManager.findValues(MOTHERBOARD_DIRECTORY, file.LABEL)));

        const readings = await Promise.all(readingsPromise);

        console.log(`Readings:\n${readings}`);
        res.json(readings);
        
    } catch (error) {
        console.error(`Error fetching motherboard values: ${error.message}`);
        res.status(500).json({error: `Could not fetch temperature values`});
    }
});

// Add api endpoints to get useful motherboard files and add then to a new section in the table 
// HERE

server.listen(port, () => console.log(`Server listening on port: http://${hostname}:${port}`));