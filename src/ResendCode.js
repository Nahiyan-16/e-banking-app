import React, { useState } from 'react';
import { resendSignUpCode } from '@aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

function ResendCode() {
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();

  const handleResend = async (e) => {
    e.preventDefault();
    try {
      await resendSignUpCode({ username: userName });
      alert('Confirmation code resent.');
      navigate('/confirm');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleResend}>
        <input
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button type="submit">Resend Code</button>
      </form>
    </div>
  );
}

export default ResendCode;
