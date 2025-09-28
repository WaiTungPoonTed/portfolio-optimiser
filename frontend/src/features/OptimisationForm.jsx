import React, { useState } from "react";
import { usePortfolioOptimisation } from "../hooks/usePortfolioOptimisation";

// Its only job is to display the form elements.
function OptimisationForm() {
  const [ticker1, setTicker1] = useState("SPY");
  const [ticker2, setTicker2] = useState("TLT");
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("");

  const {
    data: results,
    isLoading,
    error,
    optimisePortfolio,
  } = usePortfolioOptimisation();

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      ticker1,
      ticker2,
      start_date: startDate,
      end_date: endDate || null, // Send null if the date is empty
    };

    console.log("Form Submitted with values:", payload);

    // Call the function from our hook to trigger the API call
    optimisePortfolio(payload);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Enter Portfolio Details</h2>
        <div>
          <label htmlFor="ticker1">Ticker 1:</label>
          <input
            id="ticker1"
            type="text"
            value={ticker1}
            onChange={(e) => setTicker1(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ticker2">Ticker 2:</label>
          <input
            id="ticker2"
            type="text"
            value={ticker2}
            onChange={(e) => setTicker2(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date (Optional):</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit">Optimise Portfolio</button>
      </form>

      <div className="results-section">
        {/* This block will only render if isLoading is true */}
        {isLoading && <p>Loading results from the quantum realm...</p>}

        {/* This block will only render if there is an error message */}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {/* This block will only render if we have successful results */}
        {results && (
          <div>
            <h3>Optimisation Successful!</h3>
            {/* The <pre> tag is great for displaying JSON nicely */}

            <pre>{JSON.stringify(results, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
export default OptimisationForm;
