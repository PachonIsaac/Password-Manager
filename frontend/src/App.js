import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import Dashboard from './components/Dashboard/Dashboard';
import RegisterForm from './components/RegisterForm/RegisterForm';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    return <Navigate to='/dashboard' />;  
  };

  return (
    <Router>
      <div className='App'>
        <Routes>
          {/* Ruta para el formulario de inicio de sesión */}
          <Route
            path='/'
            element={<LoginForm handleLogin={handleLogin} />}
          />
          {/* Ruta protegida para el dashboard */}
          <Route
            path='/dashboard'
            element={isLoggedIn ? <Dashboard /> : <Navigate to='/' />}
          />
          <Route path='/register' element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
