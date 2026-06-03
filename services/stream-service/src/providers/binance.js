const WebSocket = require("ws")

const { publishQuote,} = require("../publishers/redisPublisher")

const streams = ["btcusdt@trade","ethusdt@trade","solusdt@trade",]

function startBinanceFeed() {
    const wsUrl = `wss://stream.binance.com:9443/stream?streams=${streams.join("/")}`

    const ws  = new WebSocket(wsUrl)

    ws.on("open",() => {
        console.log("Connected to Binance WebSocket")
    })

    ws.on("message" ,  async (rawData) => {
        const parsed = JSON.parse(rawData.toString())
        const data = parsed.data
        if(!data) return

        const payload = {
            symbol: data.s,
            price: Number(data.p),
            quantity: Number(data.q),
            timestamp: data.T,
            source: "binance"
        }
        console.log(payload)
        await publishQuote(payload)
    })

    ws.on("error",(e) =>{
        console.error("Binance WebSocket error:" , e)
    })

    ws.on("close" , () => {
        console.log("Binance WebSocket closed. Reconnecting in 5 seconds...")
    })
}

module.exports = {
    startBinanceFeed,
}
/*
opens live websocket connection,
receives real trades,
normalizes events,
publishes into Redis.
*/ 