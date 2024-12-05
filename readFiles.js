// Reads the content of a folder
async function readFolder(dir) {
    try {
        let contents =  fs.readdir();
        return contents; // Returns an array of all the contents in the file
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

module.exports = {readFolder, findTemperatureFiles, findTemperatureValues};