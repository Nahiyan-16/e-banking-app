import React, { useState } from 'react';
import { signUp, fetchAuthSession, getCurrentUser } from '@aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { saveUserData } from './api'; 

function SignUp() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      let userData = {
        username: userName,
        password,
        options: {
          userAttributes: {
            email,
            phone_number: phoneNumber,
            given_name: firstName,
            family_name: lastName,
            address,
            birthdate, // format: YYYY-MM-DD
          },
        },
      }
      await signUp(userData);

      alert('Sign up successful! Now confirm your account.');
      navigate('/confirm', { state: { userName } });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input placeholder='User Name' value={userName} onChange={e=> setUserName(e.target.value)} />
        <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
        <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
        <input placeholder="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
        <input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
        <input placeholder="Birthdate (YYYY-MM-DD)" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
        <p>Already have an account? <a href="/signin">Sign In</a></p>
      </form>
    </div>
  );
}

export default SignUp;
