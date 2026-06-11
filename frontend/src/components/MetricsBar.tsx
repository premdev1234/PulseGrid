import {
    useEffect,
    useState,
} from "react"

import { useMarketStore } from "../store/marketStore"
import { API_BASE_URL } from "../config"

type Metrics = {
    alerts: number
    investigations: number
    uptime: number
}

export default function MetricsBar() {

    const [metrics, setMetrics] =
        useState<Metrics | null>(null)

    const alerts =
        useMarketStore(
            (state) => state.alerts
        )

    const investigations =
        useMarketStore(
            (state) => state.investigations
        )

    const criticalAlerts =
        alerts.filter(
            (alert) =>
                alert.severity === "HIGH"
        ).length

    useEffect(() => {

        loadMetrics()

        const interval =
            setInterval(
                loadMetrics,
                5000
            )

        return () =>
            clearInterval(interval)

    }, [])

    async function loadMetrics() {

        try {

            const response =
                await fetch(
                    "${API_BASE_URL}/metrics"
                )

            const data =
                await response.json()

            setMetrics(data)

        } catch (err) {

            console.error(
                "Metrics load failed",
                err
            )

        }
    }

    return (
        <div
            className="
                mt-4
                grid
                grid-cols-2
                gap-4
                lg:grid-cols-4
            "
        >

            <MetricCard
                title="Alerts"
                value={
                    metrics?.alerts ??
                    alerts.length
                }
            />

            <MetricCard
                title="Investigations"
                value={
                    metrics?.investigations ??
                    investigations.length
                }
            />

            <MetricCard
                title="Gateway Uptime"
                value={
                    metrics
                        ? `${Math.floor(
                            metrics.uptime / 60
                        )}m`
                        : "--"
                }
            />

            <MetricCard
                title="Critical"
                value={criticalAlerts}
                critical={
                    criticalAlerts > 0
                }
            />

        </div>
    )
}

function MetricCard(
    {
        title,
        value,
        critical = false,
    }: {
        title: string
        value: number | string
        critical?: boolean
    }
) {

    return (
        <div
            className={`
                rounded-lg
                border
                p-4
                ${
                    critical
                        ? "border-red-500 bg-red-950/30"
                        : "border-slate-700 bg-slate-800"
                }
            `}
        >

            <p className="text-sm text-slate-400">
                {title}
            </p>

            <p className="mt-2 text-2xl font-bold">
                {value}
            </p>

        </div>
    )
}
