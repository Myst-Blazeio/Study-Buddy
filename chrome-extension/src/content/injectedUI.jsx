import React from "react";
import ReactDOM from "react-dom/client";
import Toolbar from "../components/Toolbar";

const isLoggedIn = localStorage.getItem("loggedIn") === "true";

if (isLoggedIn) {
  const container = document.createElement("div");
  container.id = "yt-ai-toolbar";
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);
  root.render(<Toolbar />);
}
