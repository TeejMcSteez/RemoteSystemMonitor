const fs = require('node:fs');
const { machine } = require('node:os');
const path = require('node:path');
// Reads the content of a folder
function readFolder(dir) { // Callback inside of a callback oh boy this should be food
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, buffer) => {
            console.log(`Readings files from ${dir}`);
            if (err) {
                reject(`Could not read files from ${dir}`);
            } else {
                resolve(buffer);
            }
        });
    });
}

// Finds the files containing temperature values within the directory
function findTemperatureFiles(dirContents) {
    const tempRegex = /temp\d+_\w+/; // Finds all files with temperature reading 
    let matches = dirContents.filter(filename => tempRegex.test(filename)); // Reseach .filter()
    console.log(`matches in CPU files ${matches}`);
    if (!matches) {
        console.log("There is no temperature information in this directory");
    }
    return matches.map(match => ({ // Research .map()
        LABEL: match
    }));// Returns object array of all labels in the dir
}

// Finds useful motherboard files from the directory and returns the labels
function findMotherboardFiles(dirContents) {
    const voltageRegex = /in\d+_\w+/;
    const fanRegex = /fan\d+_\w+/;

    let voltMatches = dirContents.filter(filename => voltageRegex.test(filename));
    let fanMatches = dirContents.filter(filename => fanRegex.test(filename));

    let matches = voltMatches.concat(fanMatches);
    
    console.log(`matches in motherboard files ${matches}`);

    if (!matches) {
        console.log("There are no temperatures to map in this directory");
    } 

    return matches.map(match => ({
        LABEL: match 
    }));
}

// Finds the values of the temperature values from the files within the directory
async function findValues(dir, label) {
    return new Promise((resolve, reject) => {
        console.log(`Reading values from ${dir} at ${label}`);

        const filePath = path.join(dir, label);

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log(`Could not read file ${label}`);
                reject(err);
            } else {
                resolve({LABEL: label, VALUE: data.trim()});
            }
        });
    });
}

module.exports = {readFolder, findTemperatureFiles, findMotherboardFiles, findValues};