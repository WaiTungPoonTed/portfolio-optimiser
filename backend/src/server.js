// backend/server.js

// Import the configured app from our blueprint file, index.js
import app from "./index.js";

// Define the port the server will run on.
// It's good practice to allow this to be set by an environment variable,
// with a default value for local development.
const PORT = process.env.PORT || 3001;

// Start the server and make it listen for incoming requests on the specified port.
app.listen(PORT, () => {
  // This callback function runs once the server successfully starts.
  console.log(
    `✅ Server blueprint loaded. Ignition key turned. Engine running on http://localhost:${PORT}`
  );
});
