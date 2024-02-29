import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSignOutAlt, FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import AddPasswordDialog from '../AddPasswordDialog/AddPasswordDialog';
import EditPasswordDialog from '../EditPasswordDialog/EditPasswordDialog';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [passwords, setPasswords] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPasswordID, setSelectedPasswordID] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/get-username', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserName(response.data.username);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };

    const fetchPasswords = async () => {
      try {
        const response = await axios.get('http://localhost:8000/password/get-all-passwords', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPasswords(response.data);
      } catch (error) {
        console.error('Error al obtener las contraseñas:', error);
      }
    }

    fetchPasswords();
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleEditPassword = (passwordID) => {
    setSelectedPasswordID(passwordID);
    setIsEditDialogOpen(true);
  };

  const handleDeletePassword = async (passwordID) => {
    try {
      await axios.delete(`http://localhost:8000/password/delete-password/${passwordID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      handleUpdatePasswords();
    } catch (error) {
      console.error('Error al eliminar la contraseña:', error);
    }
  };

  const handleAddPassword = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
    handleUpdatePasswords();
  }

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    handleUpdatePasswords();
  }

  const handleUpdatePasswords = async () => {
    try {
      const response = await axios.get('http://localhost:8000/password/get-all-passwords', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPasswords(response.data);
    } catch (error) {
      console.error('Error al obtener las contraseñas:', error);
    }
  };


  return (
    <div className="dashboard-container">
      <nav className="Navbar">
        <div className="Navbar-left">
          <h1>Password Manager</h1>
          <p>User: {userName}</p>
        </div>
        <div className="Navbar-right">
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt />
          </button>
        </div>
      </nav>
      <div className="content">
        <div className='plus-button' onClick={handleAddPassword}>
          <FaPlusCircle />
        </div>
        <div className="password-list">
          <h2>Passwords</h2>
          <ul>
            {passwords.map(password => (
              <li key={password.passwordID}>
                <span>{password.password}</span>
                <div className="button-container">
                <button onClick={() => handleEditPassword(password.passwordID)}><FaEdit /></button>
                <button onClick={() => handleDeletePassword(password.passwordID)}><FaTrash /></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <AddPasswordDialog 
        isOpen={isAddDialogOpen} 
        onClose={handleCloseAddDialog} 
        />
      {isEditDialogOpen && (
        <EditPasswordDialog
          isOpen={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          onUpdate={handleUpdatePasswords}
          passwordID={selectedPasswordID}
        />
      )}
    </div>
  );
};

export default Dashboard;
