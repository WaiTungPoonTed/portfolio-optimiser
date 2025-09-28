import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// A simple color palette for the lines, you can customize this
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

function SimpleStockChart({ stockData }) {
  // `useMemo` is a performance hook. It ensures we only re-format the
  // data when the `stockData` prop actually changes.
  const { chartData, tickers } = useMemo(() => {
    if (!stockData || Object.keys(stockData).length === 0) {
      return { chartData: [], tickers: [] };
    }

    // 1. Get the list of series to plot (e.g., ["SPY", "TLT", "Quantum_Portfolio"])
    const tickersToPlot = Object.keys(stockData);

    // 2. Get a sorted list of all dates from the first series
    const dates = Object.keys(stockData[tickersToPlot[0]]).sort();

    // 3. Transform the data into the format Recharts needs:
    // From: { "SPY": {"date1": price1}, "TLT": {"date1": price2} }
    // To:   [ { "date": "date1", "SPY": price1, "TLT": price2 }, ... ]
    const transformedData = dates.map((date) => {
      const dataPoint = {
        // Format the date for better display on the axis
        date: new Date(date).toLocaleDateString(),
      };
      // Add the value for each ticker at that specific date
      tickersToPlot.forEach((ticker) => {
        dataPoint[ticker] = stockData[ticker][date];
      });
      return dataPoint;
    });

    return { chartData: transformedData, tickers: tickersToPlot };
  }, [stockData]);

  if (chartData.length === 0) {
    return <p>Waiting for data to plot...</p>;
  }

  // This is where you build the chart with components
  return (
    // ResponsiveContainer makes the chart automatically fill its parent div
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />

        {/* This is the magic part that is like Python's `df.plot()` */}
        {/* It automatically creates a <Line> for every ticker in your data */}
        {tickers.map((ticker, index) => (
          <Line
            key={ticker}
            type="monotone"
            dataKey={ticker}
            stroke={COLORS[index % COLORS.length]}
            strokeWidth={ticker === "Quantum_Portfolio" ? 3 : 1.5} // Make portfolio line thicker
            dot={false} // Hides the little dots on the line for a cleaner look
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SimpleStockChart;
