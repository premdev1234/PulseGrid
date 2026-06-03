import { create } from "zustand"

export interface Quote {
    symbol: string 
    price: number 
    volume: number
    timestamp: number
    source: string
}

interface MarketState {
    quotes : Record<string , Quote>
    updateQuote : (quote:Quote) => void
}

export const useMarketStore = create<MarketState>((set) => ({
    quotes: {},
    updateQuote: (quote) => set((state) =>({
        quotes: {
            ...state.quotes,
            [quote.symbol]:quote,
        },
    })),
}))