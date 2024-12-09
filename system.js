const os = require("node:os");

function getCurrentMemory() {
    const freeMem = os.freemem();

    const freeMemInGb = bytesToGb(freeMem);

    return freeMemInGb;    
}

function getTotalMemory() {
    const totalMem = os.totalmem();

    const totalMemInGb = bytesToGb(totalMem);

    return totalMemInGb;
}

function getUptime() {
    const uptime = os.uptime();

    return uptime;
}

function bytesToGb(memInBytes) {
    const memInGb = memInBytes / 1e9; // Dividing the bytes by a billion

    return memInGb;
}

module.exports = {getCurrentMemory, getUptime, getTotalMemory};