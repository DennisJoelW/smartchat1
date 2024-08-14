import React, { useState } from 'react';
import './App.css';
import Home from './components/Home/Home.jsx'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App(){
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
