import React from 'react';
import './ProfileHeader.css';

const ProfileHeader = ({ user }) => {
  return (
    <div className="profile-header">
      <div 
        className="cover-photo" 
        style={{ backgroundImage: `url(${user?.coverPhoto || 'ruta-a-imagen-predeterminada.jpg'})` }}
      />
      <div className="profile-picture">
        <img src={user?.profilePic || 'ruta-a-imagen-predeterminada.jpg'} alt="Foto de perfil" />
      </div>
      <div className="user-info">
        <h1>{user?.firstName} {user?.lastName}</h1>
        <p>@{user?.username || 'NombreUsuario'}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
