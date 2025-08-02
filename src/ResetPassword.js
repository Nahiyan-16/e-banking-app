import React, { useState } from 'react';
import { confirmResetPassword } from '@aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword
      });
      alert('Password reset. Please sign in.');
      navigate('/signin');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleReset}>
      <h2>Reset Password</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Verification Code" value={code} onChange={e => setCode(e.target.value)} />
      <input placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" />
      <button type="submit">Reset Password</button>
    </form>
  );
}

export default ResetPassword;
