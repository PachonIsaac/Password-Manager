import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './AddPasswordDialog.css';

const AddPasswordDialog = ({ isOpen, onClose }) => {
  const [length, setLength] = useState(8);
  const [CapitalLetters, setCapitalLetters] = useState(2); // [
  const [Numbers, setNumbers] = useState(2);
  const [SpecialCharacters, setSpecialCharacters] = useState(2);

  const handleClose = () => {
    onClose();
  };

  const handleCreatePassword = async () => {
    try {
      await axios.post(
        `http://localhost:8000/password/create-password?length=${length}&capital_letters=${CapitalLetters}&numbers=${Numbers}&special_characters=${SpecialCharacters}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      onClose();
    } catch (error) {
      console.error('Error al crear la contraseña:', error);
    }
  };

  return (
    <div className={`add-password-dialog ${isOpen ? 'open' : ''}`}>
      <div className="dialog-content">
        <div className="dialog-header">
          <h3>Create New Password</h3>
          <button className="close-button" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>
        <div className="input-group">
          <label htmlFor="length">Longitud:</label>
          <input
            type="number"
            id="length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor='CapitalLetters'>CapitalLetters:</label>
            <input
              type="number"
              id='CapitalLetters'
              value={CapitalLetters}
              onChange={(e) => setCapitalLetters(e.target.value)}
            />
        </div>
        <div className="input-group">
          <label htmlFor='Numbers'>Numbers: </label>
            <input
              type="number"
              id='Numbers'
              value={Numbers}
              onChange={(e) => setNumbers(e.target.value)}
            />
        </div>
        <div className="input-group">
          <label htmlFor='SpecialCharacters'>SpecialCharacters:</label>
            <input
              type="number"
              id='SpecialCharacters'
              value={SpecialCharacters}
              onChange={(e) => setSpecialCharacters(e.target.value)}
            />
        </div>
        <button className="create-button" onClick={handleCreatePassword}>
          Crear Contraseña
        </button>
      </div>
    </div>
  );
};

export default AddPasswordDialog;
