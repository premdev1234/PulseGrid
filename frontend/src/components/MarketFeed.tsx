import { useMarketStore, } from "../store/marketStore"

const watchlist = [
    "BTCUSDT",
    "ETHUSDT",
    "SOLUSDT",
    "AAPL",
    "GOOGL",
    "MSFT",
]

function formatPrice(price?: number) {
    if (price === undefined) {
        return "Waiting"
    }

    return `$${price.toLocaleString()}`
}

export default function MarketFeed() {
    const quotes = useMarketStore((state) => state.quotes)
    const selectedSymbol = useMarketStore((state) => state.selectedSymbol)
    const setSelectedSymbol = useMarketStore((state) => state.setSelectedSymbol)

    return  (
        <section className="mt-6">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Symbol Queue
                </h2>
                <span className="text-sm text-slate-400">
                    Scroll horizontally
                </span>
            </div>
            <div className="market-card-scroll flex gap-4 overflow-x-auto pb-3">
                {watchlist.map((symbol) => {
                    const quote = quotes[symbol]
                    const isSelected = selectedSymbol === symbol

                    return (
                        <button
                            key={symbol}
                            className={`min-w-64 rounded-lg border p-5 text-left transition ${
                                isSelected
                                    ? "border-cyan-400 bg-slate-800"
                                    : "border-slate-700 bg-slate-800 hover:border-slate-500"
                            }`}
                            type="button"
                            onClick={() => setSelectedSymbol(symbol)}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="text-xl font-bold">
                                    {symbol}
                                </h3>
                                <span className={`h-2.5 w-2.5 rounded-full ${
                                    quote ? "bg-emerald-400" : "bg-slate-500"
                                }`} />
                            </div>
                            <p className="mt-3 text-3xl font-semibold text-emerald-300">
                                {formatPrice(quote?.price)}
                            </p>
                            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                <span className="text-slate-400">
                                    Volume
                                </span>
                                <span className="text-right text-slate-200">
                                    {quote?.volume.toLocaleString() ?? "n/a"}
                                </span>
                                <span className="text-slate-400">
                                    Source
                                </span>
                                <span className="text-right text-slate-200">
                                    {quote?.source ?? "idle"}
                                </span>
                            </div>
                        </button>
                    )
                })}
            </div>
        </section>
    )
}
