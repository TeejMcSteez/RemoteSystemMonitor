const os = require("noed:os");

function getCurrentMemory() {
    const freeMem = os.freemem();

    return freeMem;    
}

function getUptime() {
    const uptime = os.uptime();

    return uptime;
}

function getMemoryTotal() {
    const totalMem = os.totalmem();

    return totalMem;
}