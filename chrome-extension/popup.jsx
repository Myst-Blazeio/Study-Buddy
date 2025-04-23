import React from "react";
import ReactDOM from "react-dom/client";
import ContentScript from "./src/content/contentScript";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ContentScript />
  </React.StrictMode>
);
