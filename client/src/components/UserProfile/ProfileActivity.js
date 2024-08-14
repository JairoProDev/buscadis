import React from 'react';
import './ProfileActivity.css';

const ProfileActivity = ({ activity }) => {
  return (
    <div className="profile-activity">
      <h2>Actividad Reciente</h2>
      <ul>
        {activity.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileActivity;
