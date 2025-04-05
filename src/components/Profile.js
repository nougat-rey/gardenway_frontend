import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('access');
        if (!token) {
          throw new Error("User not authenticated.");
        }

        const [userDataResponse, customerDataResponse] = await Promise.all([
          fetch('http://localhost:8000/auth/users/me/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }),
          fetch('http://localhost:8000/store/customers/me/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }),
        ]);

        if (!userDataResponse.ok || !customerDataResponse.ok) {
          const errorData = await userDataResponse.json();
          throw new Error(errorData.detail || 'Failed to fetch user or customer data.');
        }

        const userData = await userDataResponse.json();
        const customerData = await customerDataResponse.json();

        const combinedUserData = {
          username: userData.username,
          email: userData.email,
          first_name: userData.first_name || 'Not Provided',
          last_name: userData.last_name || 'Not Provided',
          phone: customerData.phone || 'Not Provided',
        };

        setUser(combinedUserData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="profile-container">Loading...</div>;
  }

  if (error) {
    return <div className="profile-container">Error: {error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h2>Personal Information</h2>
        <div className="profile-info">
          <p><strong>Username:</strong> {user?.username || 'Not Available'}</p>
          <p><strong>Email:</strong> {user?.email || 'Not Available'}</p>
          <p><strong>First Name:</strong> {user?.first_name || 'Not Available'}</p>
          <p><strong>Last Name:</strong> {user?.last_name || 'Not Available'}</p>
          <p><strong>Phone:</strong> {user?.phone || 'Not Provided'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
