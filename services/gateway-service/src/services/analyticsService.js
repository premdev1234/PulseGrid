const marketHistory = {}

function calculatePercentChange(oldPrice, newPrice) {

  return (
    ((newPrice - oldPrice) / oldPrice) * 100
  )
}

function analyzeQuote(quote) {

  const {
    symbol,
    price,
    volume,
  } = quote

  if (!marketHistory[symbol]) {

    marketHistory[symbol] = [price]

    return null
  }

  const history =
    marketHistory[symbol]

  const lastPrice =
    history[history.length - 1]

  const percentChange =
    calculatePercentChange(
      lastPrice,
      price
    )

  history.push(price)

  if (history.length > 20) {
    history.shift()
  }

  let anomaly = null

  if (Math.abs(percentChange) > 2) {

    anomaly = {

      type: "PRICE_SPIKE",

      severity:
        Math.abs(percentChange) > 5
          ? "HIGH"
          : "MEDIUM",

      symbol,

      percentChange:
        Number(percentChange.toFixed(2)),

      price,

      volume,

      timestamp: Date.now(),
    }
  }

  return anomaly
}

module.exports = {
  analyzeQuote,
}