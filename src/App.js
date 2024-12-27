import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Ensure you are using 'react-router-dom'
import Home from './pages/home';
import Login from './pages/login';
import CoverPage from './pages/coverPage';
import ProtectedRoute from './auth/protectedRoute';
import Trading from './pages/trading';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute component = {Home}/>} />
        <Route path= "/trading" element = {<Trading/>}/>
      </Routes>
    </div>
  );
}

export default App;
