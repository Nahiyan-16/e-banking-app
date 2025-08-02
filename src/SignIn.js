import React, { useState } from 'react';
import { signIn, fetchAuthSession, getCurrentUser } from '@aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { saveUserData } from './api'; 
import './css/SignIn.css';

function SignIn() {
  const [email, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signIn({ email: email, password });
      const session = await fetchAuthSession();
      const user = await getCurrentUser();
      const userId = user.username;

      await saveUserData(userId, { lastLogin: new Date().toISOString() });

      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input placeholder="User Name" value={email} onChange={e => setUserName(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Sign In</button>
        <p>No account? <a href="/signup">Sign Up</a></p>
      </form>
    </div>
  );
}

export default SignIn;
