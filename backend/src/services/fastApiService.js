import axios from "axios";

const getPortfolioOptimisation = async (portfolioData) => {
  console.log("Service Layer: Received data for processing:", portfolioData);

  try {
    const FASTAPI_URL = "http://localhost:8000/optimise";
    const response = await axios.post(FASTAPI_URL, portfolioData);
    return response.data;
  } catch (error) {
    console.error("Error calling Python service:", error.message);
    throw new Error("Could not connect to the optimisation service.");
  }
};

export { getPortfolioOptimisation };
