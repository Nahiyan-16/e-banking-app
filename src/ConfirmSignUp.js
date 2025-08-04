import React, { useState } from 'react';
import { confirmSignUp } from '@aws-amplify/auth';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Link as MuiLink,
  Divider
} from '@mui/material';

function ConfirmSignUp() {
  const [userName, setUserName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await confirmSignUp({ username: userName, confirmationCode: code });
      setSuccess('Account confirmed successfully! Redirecting to sign in...');
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h4" gutterBottom>
              Confirm Sign Up
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
              Please enter your username and the verification code sent to your email or phone
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
                {success}
              </Alert>
            )}

            <Box component="form" onSubmit={handleConfirm} sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                disabled={loading}
                helperText="Enter the username you used during registration"
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                label="Verification Code"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={loading}
                helperText="Check your email or SMS for the 6-digit code"
                inputProps={{
                  maxLength: 6,
                  pattern: '[0-9]*',
                }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                disabled={loading}
              >
                {loading ? 'Confirming...' : 'Confirm Account'}
              </Button>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Didn't receive a code?{' '}
                  <MuiLink component={Link} to="/resend-code" variant="body2">
                    Resend verification code
                  </MuiLink>
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <MuiLink component={Link} to="/signin" variant="body2">
                    Sign In
                  </MuiLink>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default ConfirmSignUp;