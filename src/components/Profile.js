import React, { useState, useEffect } from 'react';
import './Profile.css'; // Assuming Profile.css is in the same directory

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Added loading state
  const [error, setError] = useState(null);  // Added error state

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);  // Reset error state on each fetch

      try {
        const token = localStorage.getItem('access');  // Get the token from local storage
        if (!token) {
          throw new Error("User not authenticated.");
        }

        // Make two fetch requests in parallel
        const [userDataResponse, customerDataResponse] = await Promise.all([
          fetch('http://localhost:8000/auth/users/me/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`  // Pass token in Authorization header
            },
          }),
          fetch('http://localhost:8000/store/customers/me/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`  // Pass token in Authorization header
            },
          }),
        ]);

        // Check if both responses are successful
        if (!userDataResponse.ok || !customerDataResponse.ok) {
          const errorData = await userDataResponse.json();
          throw new Error(errorData.detail || 'Failed to fetch user or customer data.');
        }

        // Get the data from both responses
        const userData = await userDataResponse.json();
        const customerData = await customerDataResponse.json();

        // Log the response data
        console.log("Fetched user data:", userData);  
        console.log("Fetched customer data:", customerData);

        // Combine the data from both endpoints
        const combinedUserData = {
          username: userData.username,
          email: userData.email,
          first_name: userData.first_name || 'Not Provided',  // Handle empty string for first name
          last_name: userData.last_name || 'Not Provided',    // Handle empty string for last name
          phone: customerData.phone || 'Not Provided',  // Default to 'Not Provided' if phone is null
        };

        setUser(combinedUserData);  // Set the combined data into state
      } catch (error) {
        setError(error.message);  // Set error message
      } finally {
        setLoading(false);  // Set loading to false once the data is fetched
      }
    };

    fetchUserData();
  }, []);

  // If there's an error or while loading, show respective messages
  if (loading) {
    return <div className="profile-container">Loading...</div>;
  }

  if (error) {
    return <div className="profile-container">Error: {error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-info">
          <h2>Personal Information</h2>
          <p><strong>Username:</strong> {user ? user.username : 'Not Available'}</p>
          <p><strong>Email:</strong> {user ? user.email : 'Not Available'}</p>
          <p><strong>First Name:</strong> {user ? user.first_name : 'Not Available'}</p>
          <p><strong>Last Name:</strong> {user ? user.last_name : 'Not Available'}</p>
          <p><strong>Phone:</strong> {user ? user.phone : 'Not Provided'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
