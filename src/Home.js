import React from 'react';
import { signOut } from '@aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserAPI } from './api';
import { getCurrentUser } from '@aws-amplify/auth';

function Home() {
  const navigate = useNavigate();
  const handleButton = async () => {
    try{
      const user = await getCurrentUser();
      const userId = user.username;
      getCurrentUserAPI(userId);
    } catch (error) {
      console.error("Error fetching user:", error);
      navigate('/signin');
      return;
    }
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/signin');
  };

  return (
    <div className="auth-container">
      <h1>Welcome to the Bank Dashboard</h1>
      <button onClick={handleSignOut}>Sign Out</button>
      <button onClick={() => handleButton()}>BUTTON</button>
    </div>
  );
}

export default Home;
