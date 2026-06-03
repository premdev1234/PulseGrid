const { publishQuote } = require("../publishers/redisPublisher")

const symbols = [
    "BTCUSDT",
    "ETHUSDT",
    "SOLUSDT",
]

const marketState = {
    BTCUSDT: 108000,
    ETHUSDT: 6200,
    SOLUSDT: 240,
}

function randomWalk(price) {
    const changePercent = (Math.random() - 0.5) * 0.1

    return price * (1 + changePercent)
}

async function generateMarketData() {
    for (const symbol of symbols) {
        marketState[symbol] = randomWalk(marketState[symbol])

        const payload = {
            symbol,
            price: Number(
                marketState[symbol].toFixed(2)
            ),
            volume: Math.floor(
                Math.random() * 1000
            ),
            timestamp: Date.now(),
            source: "simulation"
        }

        console.log(payload)

        await publishQuote(payload)
    }
}

function startSimulator() {
    console.log("Simulation mode started")

    setInterval(generateMarketData, 1000)
}

module.exports={
    startSimulator,
}