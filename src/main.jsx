import React from "react";
import ReactDOM from "react-dom/client"; // Make sure to use the 'client' version if using React 18+
import App from "./App"; // Your root component

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
