import React, { useContext, useState } from 'react';
import './UserProfile.css';
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';
import ProfileActivity from './ProfileActivity';
import ProfileSettings from './ProfileSettings';
import { AuthContext } from '../Auth/AuthContext';

const UserProfile = () => {
  const { user, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleLogout = () => {
    logout();
  };

  const handleDeleteAccount = () => {
    // Lógica para eliminar la cuenta
  };

  const activity = ["Anuncio 1 publicado", "Anuncio 2 publicado"]; // Ejemplo de actividad

  return (
    <div className="user-profile-container">
      <ProfileHeader user={user} />
      <ProfileInfo user={user} onEdit={handleEdit} />
      <ProfileActivity activity={activity} />
      <ProfileSettings onLogout={handleLogout} onDeleteAccount={handleDeleteAccount} />
    </div>
  );
};

export default UserProfile;
