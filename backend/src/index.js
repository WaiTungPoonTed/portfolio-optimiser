// backend/index.js

// Import the necessary modules
import cors from "cors";
import "dotenv/config";
import express from "express";
import portfolioRoutes from "./route/portfolio.route.js";

// Create the Express app instance. This is our "blueprint".
const app = express();

// --- Global Middleware ---
// Enable Cross-Origin Resource Sharing for all routes
app.use(cors());
// Enable the app to parse incoming JSON request bodies
app.use(express.json());

// // --- NEW DEBUGGING MIDDLEWARE ---
// // Add this block right here!
// app.use((req, res, next) => {
//   console.log("--- Request Inspector ---");
//   console.log("Method:", req.method);
//   console.log("URL:", req.originalUrl);
//   console.log("Headers:", req.headers);
//   console.log("Body:", req.body); // <-- This is the most important line!
//   console.log("--- End Inspector ---");
//   next(); // This is crucial! It tells Express to move to the next middleware/route.
// });

app.use("/api/v1/portfolio", portfolioRoutes);

// --- Routes ---
// A simple "health check" route to confirm the server is operational.
// We will replace this with a real router file later.
app.get("/api/v1/status", (req, res) => {
  res
    .status(200)
    .json({ status: "ok", message: "Node.js Gateway is running." });
});

console.log(process.env);

// Export the fully configured app object.
// This allows other files, like our server.js, to use it.
export default app;
