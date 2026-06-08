import { useMarketStore } from "../store/marketStore"

export default function MetricsBar() {

    const alerts =
        useMarketStore(
            (state) => state.alerts
        )

    const investigations =
        useMarketStore(
            (state) => state.investigations
        )

    const quotes =
        useMarketStore(
            (state) => state.quotes
        )

    const criticalAlerts =
        alerts.filter(
            (alert) =>
                alert.severity === "HIGH"
        ).length

    const history =
        useMarketStore(
            (state) => state.history
        )
    const throughput = (
        Object.values(history)
            .reduce(
                (sum, arr) => sum + arr.length,
                0
            ) / 60
    ).toFixed(1)
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
                value={alerts.length}
            />

            <MetricCard
                title="Investigations"
                value={investigations.length}
            />

            <MetricCard
                title="Events/sec"
                value={throughput}
            />

            <MetricCard
                title="Critical"
                value={criticalAlerts}
                critical={criticalAlerts > 0}
            />

        </div>
    )
}

function MetricCard(
    {
        title,
        value,
        critical = false
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