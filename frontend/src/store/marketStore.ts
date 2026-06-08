import { create } from "zustand"

export interface Quote {
    symbol: string 
    price: number 
    volume: number
    timestamp: number
    source: string
}

export interface QuotePoint {
    symbol: string
    price: number
    volume: number
    timestamp: number
    time: string
}

export interface Alert {
    id?: number
    symbol: string
    type: string
    severity: string
    percentChange?: number
    price?: number
    volume?: number
    timestamp: number
    source?: string
    metadata?: Record<string, unknown>
}

export interface Investigation extends Alert {
    investigation: string
}

interface MarketState {
    quotes : Record<string , Quote>
    history: Record<string, QuotePoint[]>
    alerts: Alert[]
    investigations: Investigation[]
    selectedSymbol: string
    updateQuote : (quote:Quote) => void
    addAlert: (alert:Alert) => void
    addInvestigation: (investigation:Investigation) => void
    setSelectedSymbol: (symbol:string) => void
}

function normalizeQuote(quote: Partial<Quote> & { quantity?: number }) {
    const symbol = quote.symbol
    const price = Number(quote.price)
    const volume = Number(quote.volume ?? quote.quantity ?? 0)
    const timestamp = Number(quote.timestamp || Date.now())

    if (!symbol || !Number.isFinite(price)) {
        return null
    }

    return {
        symbol,
        price,
        volume: Number.isFinite(volume) ? volume : 0,
        timestamp: Number.isFinite(timestamp) ? timestamp : Date.now(),
        source: quote.source || "unknown",
    }
}

export const useMarketStore = create<MarketState>((set) => ({
    quotes: {},
    history: {},
    alerts: [],
    investigations: [],
    selectedSymbol: "BTCUSDT",
    updateQuote: (quote) => set((state) =>{
        const normalizedQuote = normalizeQuote(quote)

        if (!normalizedQuote) {
            return state
        }

        return {
            quotes: {
                ...state.quotes,
                [normalizedQuote.symbol]: normalizedQuote,
            },
            history: {
                ...state.history,
                [normalizedQuote.symbol]: [
                    ...(state.history[normalizedQuote.symbol] || []),
                    {
                        symbol: normalizedQuote.symbol,
                        price: normalizedQuote.price,
                        volume: normalizedQuote.volume,
                        timestamp: normalizedQuote.timestamp,
                        time: new Date(normalizedQuote.timestamp).toLocaleTimeString(),
                    },
                ].slice(-60),
            },
        }
    }),
    addAlert: (alert) => set((state) => ({
        alerts: [
            alert,
            ...state.alerts,
        ].slice(0, 20),
    })),
    addInvestigation: (investigation) => set((state) => ({
        investigations: [
            investigation,
            ...state.investigations,
        ].slice(0, 10),
    })),
    setSelectedSymbol: (symbol) => set({
        selectedSymbol: symbol,
    }),
}))
