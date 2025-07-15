// src/routes/portfolio.route.js
import express from "express";

// We will create this controller function in the next step
import { optimisePortfolio } from "../controllers/portfolio.controller.js";

// Create a new router instance
const router = express.Router();

// When a POST request comes to the '/optimise' path,
// execute the optimisePortfolio controller function.
router.post("/optimise", optimisePortfolio);

// Export the router to be used in our main index.js
export default router;
