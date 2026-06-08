import { useMarketStore } from "../store/marketStore"

export default function StatusBanner() {

    const alerts =
        useMarketStore(
            (state) => state.alerts
        )

    const investigations =
        useMarketStore(
            (state) => state.investigations
        )

    const criticalCount =
        alerts.filter(
            (alert) =>
                alert.severity === "HIGH"
        ).length

    const status =
        criticalCount > 0
            ? "warning"
            : "healthy"

    return (
        <div
            className={`
        mt-4
        rounded-lg
        border
        px-4
        py-3
        ${status === "healthy"
                    ? "border-emerald-500/30 bg-emerald-950/20"
                    : "border-amber-500/30 bg-amber-950/20"
                }
    `}
        >

            <div
                className="
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-3
                "
            >

                <div>

                    <span
                        className="
                            font-semibold
                        "
                    >
                        {
                            status === "healthy"
                                ? "🟢 PulseGrid Operational"
                                : "🟡 Active Market Events"
                        }
                    </span>

                </div>

                <div
                    className="
        text-sm
        text-slate-400
    "
                >
                    {alerts.length}
                    {" "}
                    alerts detected • {" "}
                    {investigations.length}
                    {" "}
                    investigations completed
                </div>

            </div>

        </div>
    )
}