import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

import { useMarketStore, } from "../store/marketStore"

export default function MarketCharts() {
    const selectedSymbol = useMarketStore(
        (state) => state.selectedSymbol
    )
    const historyMap = useMarketStore(
        (state) => state.history
    )
    const history = historyMap[selectedSymbol] ?? []
    
    const hasHistory = history.length > 0

    return (
        <section className="mt-6">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Live Charts
                </h2>
                <span className="text-sm text-slate-400">
                    {selectedSymbol}
                </span>
            </div>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
                    <h3 className="text-sm font-semibold text-slate-300">
                        Price
                    </h3>
                    <div className="mt-3 h-72">
                        {!hasHistory && (
                            <div className="flex h-full items-center justify-center rounded-md bg-slate-950 text-sm text-slate-500">
                                Waiting for live prices.
                            </div>
                        )}
                        {hasHistory && (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={history}>
                                    <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                                    <XAxis dataKey="time" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                                    <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} domain={["auto", "auto"]} />
                                    <Tooltip
                                        contentStyle={{
                                            background: "#020617",
                                            border: "1px solid #334155",
                                            borderRadius: 8,
                                            color: "#e2e8f0",
                                        }}
                                    />
                                    <Area
                                        dataKey="price"
                                        fill="#22d3ee"
                                        fillOpacity={0.18}
                                        stroke="#22d3ee"
                                        strokeWidth={2}
                                        type="monotone"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
                <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
                    <h3 className="text-sm font-semibold text-slate-300">
                        Volume
                    </h3>
                    <div className="mt-3 h-72">
                        {!hasHistory && (
                            <div className="flex h-full items-center justify-center rounded-md bg-slate-950 text-sm text-slate-500">
                                Waiting for live volume.
                            </div>
                        )}
                        {hasHistory && (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={history}>
                                    <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                                    <XAxis dataKey="time" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                                    <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{
                                            background: "#020617",
                                            border: "1px solid #334155",
                                            borderRadius: 8,
                                            color: "#e2e8f0",
                                        }}
                                    />
                                    <Bar dataKey="volume" fill="#a3e635" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
