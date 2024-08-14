import React from 'react';
import './ProfileInfo.css';

const ProfileInfo = ({ user }) => {
  if (!user) {
    // Manejo de casos donde user es null o undefined
    return <p>Información del usuario no disponible</p>;
  }

  return (
    <div className="profile-info">
      <h2>Información Básica</h2>
      <p><strong>Nombre:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Correo electrónico:</strong> {user.email}</p>
      <p><strong>Número de teléfono:</strong> {user.phoneNumber}</p>
      <button className="edit-profile-btn">Editar Perfil</button>
    </div>
  );
};

export default ProfileInfo;
