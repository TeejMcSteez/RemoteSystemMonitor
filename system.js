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

function splitUptime(uptime) {
    const days = uptime / 86400;
    uptime -= 86400 * days; // Subtracting time from time to calculate to account for whats already been calculated
    const hrs = uptime / 3600;
    uptime -= 3600 * hrs;
    const mins = uptime / 60;
    uptime -= 60 * mins;
    const uptimeSplitArray = [Math.floor(days), Math.floor(hrs), Math.floor(mins), Math.floor(uptime)]; // Days, Hrs, Mins, Seconds

    return uptimeSplitArray;
}

module.exports = {getCurrentMemory, getUptime, getTotalMemory, splitUptime};