import React from 'react';
import './ProfileSettings.css';

const ProfileSettings = ({ onLogout, onDeleteAccount }) => {
  return (
    <div className="profile-settings">
      <h2>Configuraciones</h2>
      <button onClick={onLogout} className="logout-button">Cerrar Sesión</button>
      <button onClick={onDeleteAccount} className="delete-button">Eliminar Cuenta</button>
    </div>
  );
};

export default ProfileSettings;
