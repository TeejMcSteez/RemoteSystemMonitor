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
    const days = Math.floor(uptime / 86400);
    uptime -= 86400 * days; // Subtracting time from time to calculate to account for whats already been calculated
    const hrs = Math.floor(uptime / 3600);
    uptime -= 3600 * hrs;
    const mins = Math.floor(uptime / 60);
    uptime -= Math.floor(60 * mins);
    const uptimeSplitArray = [days, hrs, mins, uptime]; // Days, Hrs, Mins, Seconds

    return uptimeSplitArray;
}

module.exports = {getCurrentMemory, getUptime, getTotalMemory, splitUptime};