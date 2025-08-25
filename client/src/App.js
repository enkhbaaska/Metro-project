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
import EPC from "./pages/BidniiTukhai/epc/EPC";
import Jobs from "./pages/BidniiTukhai/Jobs";

import EpcEronhii from "./pages/BidniiTukhai/epc/eronhii";
import EpcDuhua from "./pages/BidniiTukhai/epc/duhuaengineer";
import EpcKtz from "./pages/BidniiTukhai/epc/ktz";
import EpcKoreaNT from "./pages/BidniiTukhai/epc/koreanational";
import EpcSuson from "./pages/BidniiTukhai/epc/susonengineer";

/* ---------- UB METRO ТӨСӨЛ section (new) ---------- */
/* Create these files under ./pages/UbMetroTusul/ if they don't exist:
   - UbMetroTusul.jsx          (parent layout that may include sidebar + <Outlet/>)
   - ProjectInfo.jsx           (Төслийн мэдээлэл)
   - Progress.jsx              (Төслийн явц)
   - Feasibility.jsx           (Техник, эдийн засгийн үндэслэл (ТЭЗҮ))
   - MasterPlan.jsx            (Эх загвар зураг)
   - Financing.jsx             (Төслийн санхүүжилт)
   - Benefits.jsx              (Төслийн үр өгөөж)
   - Legal.jsx                 (Хууль, эрх зүйн орчин)
*/
import UbMetroTusul from "./pages/UbMetroTusul/UbMetroTusul";
import ProjectInfo from "./pages/UbMetroTusul/ProjectInfo";
import Progress from "./pages/UbMetroTusul/Progress";
import Feasibility from "./pages/UbMetroTusul/Feasibility";
import MasterPlan from "./pages/UbMetroTusul/MasterPlan";
import Financing from "./pages/UbMetroTusul/Financing";
import Benefits from "./pages/UbMetroTusul/Benefits";
import Legal from "./pages/UbMetroTusul/Legal";

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
          <Route path="/about" element={<BidniiTukhai />}>
            <Route index element={<Organization />} />
            <Route path="organization" element={<Organization />} />
            <Route path="vision" element={<Vision />} />
            <Route path="message" element={<Message />} />
            <Route path="pmc" element={<PMC />} />

            {/* EPC parent */}
            <Route path="epc" element={<EPC />}>
              <Route index element={<EpcEronhii />} />
              <Route path="eronhii" element={<EpcEronhii />} />
              <Route path="duhua" element={<EpcDuhua />} />
              <Route path="ktz" element={<EpcKtz />} />
              <Route path="korea-nr" element={<EpcKoreaNT />} />
              <Route path="suson" element={<EpcSuson />} />
            </Route>

            <Route path="jobs" element={<Jobs />} />
          </Route>

          {/* UB METRO ТӨСӨЛ section (new parent + nested subpages) */}
          <Route path="/ubmetrotusul" element={<UbMetroTusul />}>
            {/* default landing for /ubmetrotusul */}
            <Route index element={<ProjectInfo />} />
            <Route path="project-info" element={<ProjectInfo />} />   {/* Төслийн мэдээлэл */}
            <Route path="progress" element={<Progress />} />         {/* Төслийн явц */}
            <Route path="feasibility" element={<Feasibility />} />   {/* ТЭЗҮ */}
            <Route path="master-plan" element={<MasterPlan />} />    {/* Эх загвар зураг */}
            <Route path="financing" element={<Financing />} />       {/* Төслийн санхүүжилт */}
            <Route path="benefits" element={<Benefits />} />         {/* Төслийн үр өгөөж */}
            <Route path="legal" element={<Legal />} />               {/* Хууль, эрх зүйн орчин */}
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
