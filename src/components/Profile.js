// src/components/Profile.js
import React from 'react';

const Profile = () => {
  return (
    <div>
      <h1>My Profile</h1>
      <p>Welcome to your profile page!</p>
      
      <div className="profile-info">
        <h2>Username: johndoe</h2>
        <p>Email: johndoe@example.com</p>
        <p>Joined: January 2022</p>
      </div>
    </div>
  );
};

export default Profile;
