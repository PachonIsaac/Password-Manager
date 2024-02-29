import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './EditPasswordDialog.css';

const EditPasswordDialog = ({ isOpen, onClose, passwordID, onUpdate }) => {
  const [length, setLength] = useState(8);
  const [capitalLetters, setCapitalLetters] = useState(2);
  const [numbers, setNumbers] = useState(2);
  const [specialCharacters, setSpecialCharacters] = useState(2);

  const handleClose = () => {
    console.log('Close dialog');
    onClose();
  };

  const handleUpdatePassword = async () => {
    try {
      await axios.put(
        `http://localhost:8000/password/update-password/${passwordID}`,
        {
          length: length,
          capital_letters: capitalLetters,
          numbers: numbers,
          special_characters: specialCharacters
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  return (
    <div className={`edit-password-dialog ${isOpen ? 'open' : ''}`}>
      <div className="dialog-content">
        <div className="dialog-header">
          <h3>Edit Password</h3>
          <button className="close-button" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>
        <div className="input-group">
          <label htmlFor="length">Length:</label>
          <input
            type="number"
            id="length"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="input-group">
          <label htmlFor='capitalLetters'>Capital Letters:</label>
          <input
            type="number"
            id='capitalLetters'
            value={capitalLetters}
            onChange={(e) => setCapitalLetters(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="input-group">
          <label htmlFor='numbers'>Numbers: </label>
          <input
            type="number"
            id='numbers'
            value={numbers}
            onChange={(e) => setNumbers(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="input-group">
          <label htmlFor='specialCharacters'>Special Characters:</label>
          <input
            type="number"
            id='specialCharacters'
            value={specialCharacters}
            onChange={(e) => setSpecialCharacters(parseInt(e.target.value, 10))}
          />
        </div>
        <button className="update-button" onClick={handleUpdatePassword}>
          Update Password
        </button>
      </div>
    </div>
  );
};

export default EditPasswordDialog;
