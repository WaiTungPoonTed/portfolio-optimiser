// src/controllers/portfolio.controller.js

// We use the new service function name here
import { getPortfolioOptimisation } from "../services/fastApiService.js";

// The controller function is renamed
const optimisePortfolio = async (req, res) => {
  try {
    const { ticker1, ticker2, start_date, end_date } = req.body;

    if (!ticker1 || !ticker2 || !start_date) {
      return res.status(400).json({
        error: "`Ticker 1`, `Ticker 2` and `Start date` fields are required.",
      });
    }

    // Call the service layer with the new function name
    const result = await getPortfolioOptimisation({
      tickers: [ticker1, ticker2],
      start_date,
      end_date,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error:", error.message);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

export { optimisePortfolio };
