const os = require("node:os");

function getCurrentMemory() {
    const freeMem = os.freemem();

    return freeMem;    
}

function getTotalMemory() {
    const totalMem = os.totalmem();

    return totalMem;
}

function getUptime() {
    const uptime = os.uptime();

    return uptime;
}

module.exports = {getCurrentMemory, getUptime, getTotalMemory};