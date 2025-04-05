import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login'); // Redirect to login after logout
  }, [navigate]);

  return (
    <div className="auth-container">
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
