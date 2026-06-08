const { pool } = require("../db/postgres")
const { redisClient } = require("../redis/client")
const axios = require("axios")

async function checkPostgres() {
    try {
        await pool.query("SELECT 1")

        return "UP"
    } catch {
        return "DOWN"
    }
}

async function checkRedis() {
    try {
        await redisClient.ping()

        return "UP"
    } catch {
        return "DOWN"
    }
}

async function checkAgentBridge() {
    try {
        const response = await axios.get(
            "http://agent-bridge:5000/health"
        )
        return response.status == 200 ? "UP" : "DOWN"
    } catch {
        return "DOWN"
    }
}

async function getSystemHealth() {
    const [
        postgres,
        redis,
        agentBridge,
    ] = await Promise.all([
        checkPostgres(),
        checkRedis(),
        checkAgentBridge(),
    ])

    const overall = (
        postgres === "UP"
        &&
        redis === "UP"
        &&
        agentBridge === "UP"
    )

    return {
        status:
            overall ? "UP" : "DEGRADED",
        timestamp:
            new Date(),
        services: {
            postgres,
            redis,
            agentBridge,
        },
    }
}

module.exports = {
    getSystemHealth,
}