const { MongoClient } = require("mongodb")

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

let memoryCollection = null

const fallbackMemory = []

async function connectMemory() {
    try { 
        await client.connect()

        console.log("Connected to MongoDB")

        const db =  client.db("pulsegrid_memory")
        memoryCollection = db.collection("investigations")
    } catch (err){
        console.error("MongoDB connection failed:")
        console.error("Using fallback in-memory storage")
        console.error(err.message)
    }
}

function getMemoryCollection(){
    if(memoryCollection){
        return memoryCollection
    } 
    return {
        async insertOne(doc){
            fallbackMemory.push(doc)
        },
    } 
}

async function getRecentInvestigations(symbol){
    if(memoryCollection){
        return await memoryCollection.find({
            "anomaly.symbol": symbol,
        }).sort({
            createdAt:-1,
        }).limit(3).toArray()
    }
    return fallbackMemory.filter(
        (item) => item.anomaly.symbol == symbol
    ).slice(-3)
}

module.exports = {
    connectMemory,
    getMemoryCollection,
    getRecentInvestigations,
}