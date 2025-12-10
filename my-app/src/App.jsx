import { useState } from "react"
import './App.css'
import Header from './Header.jsx'
import MainContent from './MainContent.jsx'
import Footer from './Footer.jsx'


function App() {

  return (
    <div className="app-container">
      <Header />
      <MainContent />
      <Footer />
    </div>
  )
}



export default App
