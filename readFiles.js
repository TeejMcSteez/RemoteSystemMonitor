const fs = require('node:fs');
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
    if (!matches) {
        console.log("There is no temperature information in this directory");
    }
    return matches.map(match => ({ // Research .map()
        LABEL: match
    }));// Returns object array of all labels in the dir
}

// for (const label of labels) {
//     try { // joins home name with label name and reads information from the file
//         // Finally it pushes the information to the readings array to be returned for use
//         const filePath = path.join(currentDir, label.LABEL); 
//         const reading = await fs.readFile(filePath, 'utf8');
//         readings.push ({
//             LABEL: label.LABEL,
//             VALUE: reading.trim()
//         });
//     } catch (error) {
//         console.error(`Could not read file ${label.LABEL}: ${error.message}`);
//     }

// Finds the values of the temperature values from the files within the directory
function findTemperatureValues(dir, labels) {
    let currentDir = dir;
    let readings = [];
    return new Promise((resolve, reject) => {
       for (const label of labels) {
            const filePath = path.join(currentDir, label.LABEL);
            fs.readFile(filePath, (err, buffer) => {
                console.log(`Reading file ${filePath}`);
                if (err) {
                    reject(`Could not read value from ${filePath}`);
                } else {
                    readings.push(label.LABEL, buffer);
                }
            });
        }
        console.log(`Readings before resolve: ${readings}`);
        resolve(readings); // One all values have been added to their labels resolves the array of data
    });    
}

module.exports = {readFolder, findTemperatureFiles, findTemperatureValues};