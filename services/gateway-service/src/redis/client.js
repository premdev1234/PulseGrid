const { createClient } = require("redis")

const redisClient = createClient({
    url: process.env.REDIS_URL , 
})

redisClient.on("error" , (err) => {
    console.error("Redis error :" , err)
})

async function connectRedis() {
    await redisClient.connect()

    console.log("Redis Connected")
}

async function publishAnomaly(anomaly){
    await redisClient.publish("anomalies",JSON.stringify(anomaly))
}

module.exports = {
    redisClient ,
    connectRedis,
    publishAnomaly,
}