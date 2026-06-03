require("dotenv").config()

const { createClient } = require("redis")

const redisClient = createClient({
    url: process.env.REDIS_URL,
})

redisClient.on("error" , (err) =>{
    console.error("Redis Error:",err)
})

async function connectRedis(){
    await redisClient.connect()

    console.log("Stream service connected to Redis")
}

async function publishQuote(data){
    await redisClient.publish(
        "quotes",
        JSON.stringify(data)
    )
}

module.exports ={
    connectRedis,
    publishQuote,
}