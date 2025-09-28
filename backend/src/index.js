import cors from "cors";
import "dotenv/config";
import express from "express";
import portfolioRoutes from "./route/portfolio.route.js";

const app = express();

// --- Global Middleware ---
// Enable Cross-Origin Resource Sharing for all routes
app.use(cors());
// Enable the app to parse incoming JSON request bodies
app.use(express.json());

app.use("/api/v1/portfolio", portfolioRoutes);

// --- Routes ---
app.get("/api/v1/status", (req, res) => {
  res
    .status(200)
    .json({ status: "ok", message: "Node.js Gateway is running." });
});

console.log(process.env);
export default app;
