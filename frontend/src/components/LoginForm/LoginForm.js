import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import login from '../../services/auth';

const LoginForm = ({ handleLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(formData.username, formData.password);
      handleLogin();
      setLoggedIn(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  if (loggedIn) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>PASSWORD MANAGER</h1>

          <div className="input-box">
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            <FaUser className='icon' />
          </div>

          <div className="input-box">
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <FaLock className='icon'/>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Login</button>
        </form>
        
        <br></br>
        <p>don't have an account? <button className="register-link" onClick={() => window.location.href = '/register'}>Sign Up</button></p>
        
      </div>
    </div>
  );
};

export default LoginForm;
