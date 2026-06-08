const { MongoClient } = require("mongodb")

const uri = process.env.MONGODB_URI

let memoryCollection = null
let client = null

const fallbackMemory = []

async function connectMemory() {
    if (!uri) {
        console.error("MONGODB_URI is not configured.")
        console.error("Using fallback in-memory storage")
        return
    }

    try { 
        client = new MongoClient(uri)
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
            return {
                insertedId: fallbackMemory.length - 1,
            }
        },
        async updateOne(filter, update){
            const item = fallbackMemory.find((memoryItem) => {
                return memoryItem._id === filter._id ||
                    memoryItem.incidentId === filter.incidentId
            })

            if (item && update.$set) {
                Object.assign(item, update.$set)
            }

            return {
                modifiedCount: item ? 1 : 0,
            }
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
        (item) => item.anomaly.symbol === symbol
    ).slice(-3)
}

async function searchSimilarIncidents(anomaly) {
    if(memoryCollection){
        return await memoryCollection.find({
            $or: [
                {
                    "anomaly.symbol": anomaly.symbol,
                },
                {
                    "anomaly.type": anomaly.type,
                },
            ],
        }).sort({
            createdAt:-1,
        }).limit(5).toArray()
    }

    return fallbackMemory.filter((item) => {
        return item.anomaly.symbol === anomaly.symbol ||
            item.anomaly.type === anomaly.type
    }).slice(-5)
}

async function updateInvestigationStatus(incidentId, status) {
    const memoryCollectionRef = getMemoryCollection()

    return await memoryCollectionRef.updateOne(
        {
            incidentId,
        },
        {
            $set: {
                status,
                updatedAt: new Date(),
            },
        }
    )
}

module.exports = {
    connectMemory,
    getMemoryCollection,
    getRecentInvestigations,
    searchSimilarIncidents,
    updateInvestigationStatus,
}
