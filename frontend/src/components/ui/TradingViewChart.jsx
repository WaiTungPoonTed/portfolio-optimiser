// import React, { useEffect, useMemo, useRef } from "react";
// import { createChart, CrosshairMode } from "lightweight-charts";

// const COLORS = [
//   "#0088FE",
//   "#00C49F",
//   "#FFBB28",
//   "#FF8042",
//   "#8884d8",
//   "#EF4444",
//   "#0EA5E9",
// ];

// // Convert { "2019-09-03T00:00:00": 264.68, ... } -> [{ time: "2019-09-03", value: 264.68 }, ...]
// function toSeriesData(seriesDict = {}) {
//   return Object.entries(seriesDict)
//     .map(([iso, v]) => ({
//       time: iso?.slice(0, 10), // 'YYYY-MM-DD'
//       value: Number(v),
//     }))
//     .filter((d) => d.time && Number.isFinite(d.value))
//     .sort((a, b) => new Date(a.time) - new Date(b.time));
// }

// export default function TradingViewChart({ stockData }) {
//   const containerRef = useRef(null);
//   const chartRef = useRef(null);

//   // Prepare all series upfront
//   const seriesList = useMemo(() => {
//     if (!stockData || Object.keys(stockData).length === 0) return [];
//     return Object.entries(stockData).map(([name, dict]) => ({
//       name,
//       data: toSeriesData(dict),
//     }));
//   }, [stockData]);

//   useEffect(() => {
//     if (!containerRef.current || seriesList.length === 0) return;

//     // Create chart
//     const chart = createChart(containerRef.current, {
//       height: 500,
//       layout: {
//         background: { color: "#ffffff" }, // correct shape
//         textColor: "rgba(33, 56, 77, 1)",
//       },
//       grid: {
//         vertLines: { color: "rgba(197, 203, 206, 0.5)" },
//         horzLines: { color: "rgba(197, 203, 206, 0.5)" },
//       },
//       crosshair: { mode: CrosshairMode.Normal }, // use enum, not string
//       rightPriceScale: { borderColor: "rgba(197, 203, 206, 0.8)" },
//       timeScale: {
//         borderColor: "rgba(197, 203, 206, 0.8)",
//         timeVisible: true,
//         secondsVisible: false,
//       },
//     });
//     chartRef.current = chart;

//     // Add one line series per key in stockData
//     seriesList.forEach((s, i) => {
//       const series = chart.addLineSeries({
//         color: COLORS[i % COLORS.length],
//         lineWidth: s.name === "Quantum_Portfolio" ? 3 : 2,
//       });
//       series.setData(s.data);
//     });

//     // Initial size
//     const resize = () => {
//       if (!containerRef.current || !chartRef.current) return;
//       const { width, height } = containerRef.current.getBoundingClientRect();
//       chartRef.current.applyOptions({
//         width: Math.max(200, width),
//         height: Math.max(200, height),
//       });
//     };
//     resize();
//     window.addEventListener("resize", resize);

//     chart.timeScale().fitContent();

//     return () => {
//       window.removeEventListener("resize", resize);
//       chart.remove();
//       chartRef.current = null;
//     };
//   }, [seriesList]);

//   // Ensure the container has a real size
//   return <div ref={containerRef} style={{ width: "100%", height: 500 }} />;
// }
