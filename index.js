const fs = require('node:fs'); // DOC: https://nodejs.org/api/fs.html
const path = require('node:path'); // DOC: https://nodejs.org/api/path.html
const http = require('node:http'); // DOC: https://nodejs.org/api/synopsis.html#

const hostname = '';
const port = 3000;
const TEMPERATURE_DIRECTORY = "/sys/class/hwmon"; // Modify with arch's temperature directory

// TODO:
// access temperature information with fs and path and log it
// take the logged data and output it to and HTML page 
// and then serve the html (and css) locally with http.Server http module
// Also display other information if possible such as certain log files as well
// as system errors and availible memory etc. 