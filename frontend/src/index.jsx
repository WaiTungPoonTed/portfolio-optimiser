// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./components/App";
// // import "./styles/style.css";

// ReactDOM.render(<h1>hi</h1>, document.getElementById("root"));

import React from "react";
// 1. The import path changes to 'react-dom/client'
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./styles/style.css";

// 2. You must first "create a root" attached to your HTML element
const root = ReactDOM.createRoot(document.getElementById("root"));

// 3. Then, you call the .render() method on that root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
