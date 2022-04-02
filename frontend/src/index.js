import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOMClient.createRoot(document.getElementById("root")); // Create a root.const root = ReactDOMClient.createRoot(container);

root.render(
  <Router>
    <App />
  </Router>
);
