require("dotenv").config()

const {connectRedis,} = require("./publishers/redisPublisher")
const {startSources,} = require("./providers/sourceManager")

async function bootstrap(){
    await connectRedis()
    startSources()
}

bootstrap()