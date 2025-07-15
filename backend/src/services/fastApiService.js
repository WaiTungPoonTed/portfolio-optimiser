// src/services/fastApiService.js

// Renamed the function for clarity and consistency
const getPortfolioOptimisation = async (portfolioData) => {
  console.log("Service Layer: Received data for processing:", portfolioData);

  // MOCK IMPLEMENTATION
  const mockResponse = {
    message: "Data processed successfully by mock service",
    request_data: portfolioData,
    weights: {
      [portfolioData.ticker1]: 0.65,
      [portfolioData.ticker2]: 0.35,
    },
    chart_data: {
      dates: ["2024-01-01", "2024-01-02", "2024-01-03"],
      ticker1_performance: [100, 102, 101.5],
      ticker2_performance: [200, 201, 203],
      portfolio_performance: [135, 137.65, 138.025],
    },
  };

  return await Promise.resolve(mockResponse);

  // REAL IMPLEMENTATION (FOR LATER)
  /*
  try {
    const FASTAPI_URL = 'http://localhost:8000/optimise'; // Path updated here too
    const response = await axios.post(FASTAPI_URL, portfolioData);
    return response.data;
  } catch (error) {
    console.error("Error calling Python service:", error.message);
    // Using your convention in the error message
    throw new Error("Could not connect to the optimisation service.");
  }
  */
};

export { getPortfolioOptimisation };
