import React from "react";
import NavBar from "./components/NavBar.jsx";
import Auth from "./components/Auth.jsx";

import Home from "./pages/Home.jsx";
import News from "./pages/News.jsx";
import RoadMap from "./pages/RoadMap.jsx";
import Jobs from "./pages/Jobs.jsx";
import Profile from "./pages/Profile.jsx";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/roadmap" element={<RoadMap />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="*"
          element={
            <div>
              <h2>404</h2>
              <p>Page not found</p>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
