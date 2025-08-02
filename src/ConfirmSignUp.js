import React, { useState } from 'react';
import { confirmSignUp } from '@aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

function ConfirmSignUp() {
  const [userName, setUserName] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      await confirmSignUp({ username: userName, confirmationCode: code });
      alert('Account confirmed. Please sign in.');
      navigate('/signin');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Confirm Sign Up</h2>
      <form onSubmit={handleConfirm}>
        <input placeholder="User Name" value={userName} onChange={e => setUserName(e.target.value)} />
        <input placeholder="Verification Code" value={code} onChange={e => setCode(e.target.value)} />
        <button type="submit">Confirm</button>
        <p>
            Didn’t get a code? <a href="/resend-code">Resend it</a>
        </p>
        <p>Back to <a href="/signin">Sign In</a></p>
      </form>
    </div>
  );
}

export default ConfirmSignUp;
