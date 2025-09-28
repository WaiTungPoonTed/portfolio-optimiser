import React, { useMemo, useState } from "react";
import { usePortfolioOptimisation } from "../hooks/usePortfolioOptimisation";
import SimpleStockChart from "../components/ui/SimpleStockChart";

// Shows the form + a weights block + the chart (stacked vertically)
function OptimisationForm() {
  const [ticker1, setTicker1] = useState("SPY");
  const [ticker2, setTicker2] = useState("TLT");
  const [startDate, setStartDate] = useState("2019-09-01");
  const [endDate, setEndDate] = useState("2020-09-30");
  const [formError, setFormError] = useState("");

  const {
    data: results,
    isLoading,
    error,
    optimisePortfolio,
  } = usePortfolioOptimisation();

  const today = new Date().toISOString().slice(0, 10);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError("");

    if (!ticker1.trim() || !ticker2.trim()) {
      setFormError("Please enter both tickers.");
      return;
    }
    if (endDate && new Date(endDate) < new Date(startDate)) {
      setFormError("End date must be on or after the start date.");
      return;
    }

    const payload = {
      ticker1: ticker1.trim().toUpperCase(),
      ticker2: ticker2.trim().toUpperCase(),
      start_date: startDate,
      end_date: endDate || null,
    };

    optimisePortfolio(payload);
  };

  // Extract weights/tickers from API safely
  const rawWeights = Array.isArray(results?.portfolio?.weights)
    ? results.portfolio.weights.map((w) => Number(w))
    : [];

  const returnedTickers = Array.isArray(results?.portfolio?.tickers)
    ? results.portfolio.tickers
    : null;

  const displayTickers =
    returnedTickers && returnedTickers.length === rawWeights.length
      ? returnedTickers
      : [ticker1, ticker2].slice(0, rawWeights.length);

  // Normalise weights to percentages (fallback to raw if sum is 0)
  const sumWeights = rawWeights.reduce(
    (acc, n) => acc + (Number.isFinite(n) ? n : 0),
    0
  );
  const normalizedWeights =
    sumWeights !== 0
      ? rawWeights.map((w) => w / sumWeights)
      : rawWeights.slice();

  const fmtNum = (n, digits = 4) =>
    Number.isFinite(n) ? n.toFixed(digits) : "-";
  const fmtPct = (n) => (Number.isFinite(n) ? `${(n * 100).toFixed(2)}%` : "-");
  const normalizedSum = normalizedWeights.reduce(
    (acc, n) => acc + (Number.isFinite(n) ? n : 0),
    0
  );

  // Force the chart to re-render when inputs/results change (helps Plotly/Chart.js sizing)
  const chartKey = useMemo(() => {
    const wd = rawWeights.join("|");
    const tk = (displayTickers || []).join("|");
    const sdLen = results?.stock_data
      ? Object.keys(results.stock_data).length
      : 0;
    return `${tk}-${wd}-${startDate}-${endDate}-${sdLen}`;
  }, [rawWeights, displayTickers, startDate, endDate, results?.stock_data]);

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate aria-busy={isLoading}>
        <h2>Enter Portfolio Details</h2>

        <div>
          <label htmlFor="ticker1">Ticker 1:</label>
          <input
            id="ticker1"
            name="ticker1"
            type="text"
            placeholder="e.g. SPY"
            value={ticker1}
            onChange={(e) => setTicker1(e.target.value)}
            autoComplete="off"
            inputMode="text"
            maxLength={10}
            pattern="^[A-Za-z.\\-]{1,10}$"
            title="Use letters, dot or dash (max 10 chars)"
            autoFocus
          />
        </div>

        <div>
          <label htmlFor="ticker2">Ticker 2:</label>
          <input
            id="ticker2"
            name="ticker2"
            type="text"
            placeholder="e.g. TLT"
            value={ticker2}
            onChange={(e) => setTicker2(e.target.value)}
            autoComplete="off"
            inputMode="text"
            maxLength={10}
            pattern="^[A-Za-z.\\-]{1,10}$"
            title="Use letters, dot or dash (max 10 chars)"
          />
        </div>

        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            max={endDate || today}
          />
        </div>

        <div>
          <label htmlFor="endDate">End Date (Optional):</label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
            max={today}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Optimising..." : "Optimise Portfolio"}
        </button>
      </form>

      <div className="results-section" aria-live="polite">
        {isLoading && (
          <p className="loading">Loading results from the quantum realm...</p>
        )}

        {(formError || error) && (
          <p className="error">Error: {formError || error}</p>
        )}

        {results && (
          <div>
            <h3>Optimisation Successful!</h3>

            <div className="results-stack">
              {/* Weights block */}
              {rawWeights.length > 0 && (
                <aside className="weights-card">
                  <h4>Portfolio Weights</h4>
                  <table
                    className="weights-table"
                    aria-label="Portfolio Weights"
                  >
                    <thead>
                      <tr>
                        <th>Asset</th>
                        <th>Allocation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rawWeights.map((w, i) => (
                        <tr key={`${displayTickers[i] ?? i}`}>
                          <td>{displayTickers[i] ?? `Asset ${i + 1}`}</td>
                          <td>{fmtPct(normalizedWeights[i])}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </aside>
              )}

              {/* Chart (explicit height via CSS; re-render via key) */}
              <div className="chart-container">
                <SimpleStockChart
                  key={chartKey}
                  stockData={results.stock_data}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OptimisationForm;
