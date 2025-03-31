import React, { useState, useEffect } from 'react';
import './Profile.css'; // Assuming Profile.css is in the same directory

const Profile = () => {
  // State to store user data
  const [user, setUser] = useState(null);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/store/customers/me/');
        const data = await response.json();
        setUser(data.response); // Set the response data into state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // Render loading text while data is being fetched
  if (!user) {
    return <div className="profile-container">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>
      <div className="profile-content">
        <div className="profile-info">
          <h2>Personal Information</h2>
          <p><strong>Username:</strong> {user.user_id}</p>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Phone:</strong> {user.phone || 'Not Provided'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
