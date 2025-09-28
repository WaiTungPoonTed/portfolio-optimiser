import { useState } from "react";
import axios from "axios";

// Define the API URL as a constant outside the hook function.
// This prevents it from being redeclared on every render.
const API_URL = "http://localhost:3001/api/v1/portfolio/optimise";

export function usePortfolioOptimisation() {
  // 1. State for the API Lifecycle:
  //    - `data`: To store the successful response from the backend.
  //    - `isLoading`: To know when to show a spinner or disable buttons.
  //    - `error`: To store any error messages if the call fails.
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. The Core Function:
  //    - This is the function our component will call to start the process.
  //    - It takes the form's data as its 'payload'.
  const optimisePortfolio = async (payload) => {
    // Reset state before every new call
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      // Make the actual POST request using axios
      const response = await axios.post(API_URL, payload);

      // If successful, store the response data
      setData(response.data);
    } catch (err) {
      // If there's an error, store a user-friendly error message
      const errorMessage = err.response
        ? err.response.data.error
        : "Network Error: Could not connect to service.";
      setError(errorMessage);
    } finally {
      // This always runs, whether the call succeeded or failed
      setIsLoading(false);
    }
  };

  // 3. The Return Value:
  //    - The hook exposes its current state and the trigger function.
  //    - Any component that uses this hook will receive this object.
  return { data, isLoading, error, optimisePortfolio };
}
