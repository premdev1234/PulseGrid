require("dotenv").config()
const { startSimulator } = require("./simulator")
const { startBinanceFeed } = require("./binance")
function startSources() {
    const mode = process.env.STREAM_MODE
    console.log(`Starting stream mode: ${mode}`)
    if (mode === "simulation") {
        startSimulator()
    } else if (mode === "binance") {
        startBinanceFeed()
    } else if (mode == "hybrid") {
        startSimulator()
        startBinanceFeed()
    }
    else {
        console.log("Unsupported stream mode")
    }
}
module.exports = {
    startSources,
}