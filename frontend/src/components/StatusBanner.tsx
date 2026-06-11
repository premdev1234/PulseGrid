import {
    useEffect,
} from "react"

import {
    useMarketStore,
} from "../store/marketStore"

export default function StatusBanner() {

    const health =
        useMarketStore(
            state =>
                state.systemHealth
        )

    const setHealth =
        useMarketStore(
            state =>
                state.setSystemHealth
        )

    useEffect(() => {

        loadHealth()

        const interval =
            setInterval(
                loadHealth,
                10000
            )

        return () =>
            clearInterval(interval)

    }, [])

    async function loadHealth() {

        try {

            const response =
                await fetch(
                    "http://localhost:4000/health/deep"
                )

            const data =
                await response.json()

            setHealth(data)

        } catch (err) {

            console.error(
                "Health check failed",
                err
            )

        }
    }

    if (!health) {
        return null
    }

    const healthy =
        health.status === "UP"

    return (

        <div
            className={`
                mt-4
                rounded-lg
                border
                px-4
                py-3
                ${healthy
                    ? "border-emerald-500/30 bg-emerald-950/20"
                    : "border-red-500/30 bg-red-950/20"
                }
            `}
        >

            <div className="flex flex-wrap items-center justify-between gap-3">

                <div className="font-semibold">

                    {
                        healthy
                            ? "🟢 All Services Operational"
                            : "🔴 Service Degradation Detected"
                    }

                </div>

                <div className="flex gap-4 text-sm">

                    <span>
                        PostgreSQL:
                        {" "}
                        {
                            health.services.postgres
                        }
                    </span>

                    <span>
                        Redis:
                        {" "}
                        {
                            health.services.redis
                        }
                    </span>

                    <span>
                        Agent:
                        {" "}
                        {
                            health.services.agentBridge
                        }
                    </span>

                </div>

            </div>

        </div>
    )
}