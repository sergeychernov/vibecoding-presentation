import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Presentation from './components/Presentation';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Presentation />} />
          <Route path="/slide/:slideNumber" element={<Presentation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
