import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";

import "./index.css";
import Home from "./components/Home";
import TaskDetails from "./components/TaskDetails";
import About from "./pages/About";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="task/:id" element={<TaskDetails />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
