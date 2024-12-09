const fs = require('node:fs').promises; // DOC: https://nodejs.org/api/fs.html
const path = require('node:path'); // DOC: https://nodejs.org/api/path.html
const fileManager = require('./readFiles.js'); // Utils for index
const express = require("express"); // DOC: https://expressjs.com/en/5x/api.html
require('dotenv').config(); // DOC: https://www.npmjs.com/package/dotenv
const server = express(); //Namespace for express call
const system = require('./system.js');


const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const CPU_TEMPERATURE_DIRECTORY = process.env.CPU_TEMPERATURE_DIRECTORY; // CPU Temp Directory
const MOTHERBOARD_DIRECTORY = process.env.MOTHERBOARD_DIRECTORY; // Motherboard IO Directory

// TODO:
// access temperature information with fs and path and log it ✅
// take the logged data and output it to and HTML page ✅
// and then serve the html (and css) locally with express module ✅
// Also display other information if possible such as certain log files as well ✅
// as system errors and availible memory etc. 

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

        // sends each readings value as a json response
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

        res.json(readings);
        
    } catch (error) {
        console.error(`Error fetching motherboard values: ${error.message}`);
        res.status(500).json({error: `Could not fetch temperature values`});
    }
});

server.get('/api/chartInformation', async (req, res) => {
    const memoryInformation = [system.getCurrentMemory(), system.getTotalMemory()];

    res.json(memoryInformation);
});

server.get('/api/uptime', async (req, res) => {
    const uptime = system.getUptime();

    const uptimeSplit = system.splitUptime(uptime);

    res.json(uptimeSplit);
});

server.listen(port, () => console.log(`Server listening on port: http://${hostname}:${port}`));