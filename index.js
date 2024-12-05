const fs = require('node:fs'); // DOC: https://nodejs.org/api/fs.html
const path = require('node:path'); // DOC: https://nodejs.org/api/path.html
const http = require('node:http'); // DOC: https://nodejs.org/api/synopsis.html#

const hostname = '';
const port = 3000;
const CPU_TEMPERATURE_DIRECTORY = "/sys/class/hwmon/hwmon2"; // CPU Temp Directory
const MOTHERBOARD_DIRECTORY = "/sys/class/hwmon/hwmon3"; // Motherboard IO Directory

// TODO:
// access temperature information with fs and path and log it
// take the logged data and output it to and HTML page 
// and then serve the html (and css) locally with http.Server http module
// Also display other information if possible such as certain log files as well
// as system errors and availible memory etc.

// Reads the content of a folder
async function readFolder(dir) {
    try {
        let contents =  fs.readdir();
        return contents;
    } catch (error) {
        console.log(`Could not read directory, ${error.message}`);
    }
}
// Finds the files containing temperature values within the directory
function findTemperatureFiles(dirContents) {
    const tempRegex = /(temp\d+_\w)/; // Finds all files with temperature reading 
    let matches = tempRegex.match(dirContents);
    if (!matches) {
        console.log("There is no temperature information in this directory");
    }
    let labels = [];
    matches.forEach(match => {
        labels.push({LABEL: match}); // Adds each temperature label to a new label element
    });
    return labels; // Returns object array of all labels in the dir
}
// Finds the values of the temperature values from the files within the directory
async function findTemperatureValues(labels, dir) {
    let readings = [];
    labels.forEach(label => {
        let currentDir = dir // Resets directory name with the home directory before appending new file label to search
        currentDir.append("/" + label.LABEL); // Appends name of file to home directory
        let reading = fs.readFile(currentDir); // Reads file from the current directory
        readings.push({LABEL: label.LABEL, VALUE: reading}); // Pushes read value with label to readings array to handle
    });
    return readings;
}