import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './assets/style.css';
import Analysis from './components/AnalysisPage';
import Home from './components/Login';
import PredictionResults from './components/PredictionResult';
import Signup from './components/Signup';
import User_Interface from './components/User_Interface';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Login" element={<Home />} />
        <Route path="/ui" element={<User_Interface />} />
        <Route path="/results" element={<PredictionResults />} />
        <Route path="/analysis" element={<Analysis/>} />

      </Routes>
    </Router>
  );
}

export default App;
