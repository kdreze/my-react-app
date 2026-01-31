import { useState } from "react"
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import TitlePage from './pages/TitlePage/TitlePage.jsx'
import About from './pages/About/About.jsx'
import Database from './pages/Database/Database.jsx'
import Contact from './pages/Contact/Contact.jsx'
import SymptomAnalysis from './pages/SymptomAnalysis/SymptomAnalysis.jsx'
import LoginPanel from './pages/LoginPanel/LoginPanel.jsx'


function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<TitlePage />} />
            <Route path="/about" element={<About />} /> 
            <Route path="/database" element={<Database />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/symptom-analysis" element={<SymptomAnalysis />} />
            <Route path="/login" element={<LoginPanel />} />
          </Routes>
        </main> 
        <Footer />
      </div>
    </Router>
  )
}



export default App
