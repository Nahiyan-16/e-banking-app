import React, { useState } from 'react';
import { resetPassword } from '@aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({ username: email });
      alert('Reset code sent. Check your email.');
      navigate('/reset-password');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Send Reset Code</button>
    </form>
  );
}

export default ForgotPassword;
