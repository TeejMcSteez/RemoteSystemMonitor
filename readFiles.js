const fs = require('node:fs');
// Reads the content of a folder
async function readFolder(dir) {
    let contents;
    try {
        await fs.readdir(dir, (err, buffer) => {
            console.log(`Readings files from ${dir}`);
            if (err) {
                return;
            } else {
                contents = buffer;
            }
        });
        console.log(`Buffer ${buffer}`);
        return contents; // Returns an array of all the contents in the file
    } catch (error) {
        console.log(`Could not read directory, ${error.message}`);
        return []; // If it cannot read a directory returns empty array
    }
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

// Finds the values of the temperature values from the files within the directory
async function findTemperatureValues(dir, labels) {
    let readings = [];
    for (const label of labels) {
        try { // joins home name with label name and reads information from the file
            // Finally it pushes the information to the readings array to be returned for use
            const filePath = path.join(dir, label.LABEL); 
            const reading = await fs.readFile(filePath, 'utf8');
            readings.push ({
                LABEL: label.LABEL,
                VALUE: reading.trim()
            });
        } catch (error) {
            console.error(`Could not read file ${label.LABEL}: ${error.message}`);
        }
    }
    return readings;
}

module.exports = {readFolder, findTemperatureFiles, findTemperatureValues};