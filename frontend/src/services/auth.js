// Esta función se encarga de hacer una petición POST al endpoint /token con las credenciales del usuario y, si todo sale bien, guarda el token en el localStorage.
import axios from 'axios';

const login = async (username, password) => {
  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await axios.post('http://localhost:8000/token/', formData);
    const token = response.data.access_token;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Error de inicio de sesión:', error);
    throw error;
  }
};

export default login;
