import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";

import "./globals/styles.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './i18n';

import Home from "./pages";
import About from "./pages/About";
import Report from "./components/Report";
import MusicDecisions from "./pages/Conceptualization/MusicDecisions";
import StyleDecisions from "./pages/Conceptualization/StyleDecisions";
import Prototyping from "./pages/Prototyping";
import FeedbackSession from "./pages/Evaluation/FeedackSession";
import FieldTest from "./pages/Evaluation/FieldTest";
import LaboratoryTest from "./pages/Evaluation/LaboratoryTest";
import { MiniPlayer } from "./components/MiniPlayer";
import { ThemeControls } from "./components/ThemeControls";
import { ThunderProvider } from "./contexts/Thunder";
import { Layout } from "./components/Layout";
import References from "./pages/References";
import Implementation from "./pages/Implementation";

const AppContent = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/references" element={<References />} />
        <Route path="/report" element={<Report />} />
        <Route path="/conceptualization">
          <Route path="musical-and-emotional-decisions" element={<MusicDecisions />} />
          <Route path="style-decisions" element={<StyleDecisions />} />
        </Route>
        <Route path="/prototyping/:fidelity" element={<Prototyping />} />
        <Route path="/evaluation">
          <Route path="laboratory-test" element={<LaboratoryTest />} />
          <Route path="field-test" element={<FieldTest />} />
          <Route path="feedback-session/:sessionNumber" element={<FeedbackSession />} />
        </Route>
        <Route path="/implementation" element={<Implementation />} />
      </Routes>
    </Layout>
  );
};

export default function App() {
  return (
    <HashRouter basename="/">
      <ThemeProvider>
        <ThunderProvider>
          <main>
            <AppContent />
            <MiniPlayer />
            <ThemeControls />
          </main>
        </ThunderProvider>
      </ThemeProvider>
    </HashRouter>
  );
}
