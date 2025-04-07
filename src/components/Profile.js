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
          fetch(`${process.env.REACT_APP_API_URL}/auth/users/me/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }),
          fetch(`${process.env.REACT_APP_API_URL}/store/customers/me/`, {
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
        <div className="profile-item">
          <strong>Username:</strong>
          <input type="text" value={user?.username || 'Not Available'} readOnly />
        </div>
        <div className="profile-item">
          <strong>Email:</strong>
          <input type="email" value={user?.email || 'Not Available'} readOnly />
        </div>
        <div className="profile-item">
          <strong>First Name:</strong>
          <input type="text" value={user?.first_name || 'Not Available'} readOnly />
        </div>
        <div className="profile-item">
          <strong>Last Name:</strong>
          <input type="text" value={user?.last_name || 'Not Available'} readOnly />
        </div>
        <div className="profile-item">
          <strong>Phone:</strong>
          <input type="tel" value={user?.phone || 'Not Provided'} readOnly />
        </div>
      </div>
    </div>
  );
};

export default Profile;
