// client/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import About from "./pages/About";
import Planning from "./pages/Planning";
import News from "./pages/News";
import Contact from "./pages/Contact";
import "./App.css";

const API_BASE =
  (process.env.REACT_APP_API_URL || "http://localhost:3001") + "/api";

function App() {
  const [serverMsg, setServerMsg] = React.useState(null);

  React.useEffect(() => {
    fetch(API_BASE)
      .then((r) => r.json())
      .then((data) => setServerMsg(data.message))
      .catch(() => setServerMsg(null));
  }, []);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HeroSection serverMsg={serverMsg} />} />
          <Route path="/about" element={<About />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
