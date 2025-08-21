// client/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
// import About from "./pages/About"; // <-- removed to avoid conflict with /about nested section
import Planning from "./pages/Planning";
import News from "./pages/News";
import Contact from "./pages/Contact";

import BidniiTukhai from "./pages/BidniiTukhai/BidniiTukhai";
import Organization from "./pages/BidniiTukhai/Organization";
import Vision from "./pages/BidniiTukhai/Vision";
import Message from "./pages/BidniiTukhai/Message";
import PMC from "./pages/BidniiTukhai/PMC";
import EPC from "./pages/BidniiTukhai/EPC";
import Jobs from "./pages/BidniiTukhai/Jobs";

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
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home serverMsg={serverMsg} />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />

          {/* About / BidniiTukhai section with nested routes */}
          {/* parent route renders BidniiTukhai and nested <Outlet/> shows children */}
          <Route path="/about" element={<BidniiTukhai />}>
            {/* default child when visiting /about */}
            <Route index element={<Organization />} />
            <Route path="organization" element={<Organization />} />
            <Route path="vision" element={<Vision />} />
            <Route path="message" element={<Message />} />
            <Route path="pmc" element={<PMC />} />
            <Route path="epc" element={<EPC />} />
            <Route path="jobs" element={<Jobs />} />
          </Route>

          {/* fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
