import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir después del registro

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Obtiene la función de navegación para redirigir

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/user/create-user', {
        username: username,
        password: password
      });
      if (response && response.data) {
        // Si la respuesta es exitosa, redirige a la página de inicio de sesión
        navigate('/');
      } else {
        console.error('Error registering user: Response or data is undefined');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.response) {
        // La solicitud fue hecha y el servidor respondió con un código de estado que no está en el rango de 2xx
        console.error('Server response:', error.response.data);
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió ninguna respuesta
        console.error('No response received');
      } else {
        // Algo sucedió en la configuración de la solicitud que desencadenó un error
        console.error('Error setting up the request:', error.message);
      }
      setError('Error registering user. Please try again.');
    }
  };

  return (
    <div className="wrapper">
      <h1>PASSWORD MANAGER</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="input-box">
      <input type="text" placeholder="User" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="input-box">
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleRegister}>CREATE ACCOUNT</button>
    </div>
  );
};

export default RegisterForm;
