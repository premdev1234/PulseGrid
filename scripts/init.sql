CREATE TABLE IF NOT EXISTS market_ticks (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(20),
    price NUMERIC,
    volume NUMERIC,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS anomaly_events (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(20),
    anomaly_type VARCHAR(100),
    severity VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);