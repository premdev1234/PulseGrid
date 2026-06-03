import { useMarketStore, } from "../store/marketStore"

export default function MarketFeed() {
    const quotes = useMarketStore((state => state.quotes))

    return  (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {Object.values(quotes).map((quote) => (
                <div key = {quote.symbol} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                    <h2 className="text-xl font-bold">
                        {quote.symbol}
                    </h2>
                    <p className="text-3xl mt-2 text-green-400">
                        ${quote.price}
                    </p>
                    <p className="mt-2 text-slate-400">
                        Volume: {quote.volume}
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                        Source: {quote.source}
                    </p>
                </div>
            ))}
        </div>
    )
}