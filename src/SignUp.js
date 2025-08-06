import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { signUp } from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { saveUserData } from "./api.js";

function SignUp() {
  // Generate account number on component mount
  const generateAccountNumber = () => {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    ssnLast4: "",
    governmentId: {
      type: "",
      number: "",
      issuedState: "",
      expirationDate: "",
    },
    account: {
      type: "checking",
      routingNumber: "021000021", // Hard-coded routing number
      accountNumber: generateAccountNumber(), // Auto-generated account number
      initialDeposit: "",
    },
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e, path) => {
    const keys = path.split(".");
    const value = e.target.value;

    setFormData((prev) => {
      const updated = { ...prev };
      let current = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const acctId = `acct-${uuidv4()}`;

    try {
      const user = {
        id: uuidv4(),
        username: formData.username,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate: formData.birthDate,
        address: formData.address,
        ssnLast4: formData.ssnLast4,
        governmentId: formData.governmentId,
        accounts: [
          {
            accountId: acctId,
            type: formData.account.type,
            routingNumber: "021000021",
            accountNumber: `*****${formData.account.accountNumber.slice(-4)}`,
            balance: parseFloat(formData.account.initialDeposit),
            currency: "USD",
            createdAt: new Date().toISOString(),
            transactions: [
              {
                accountId: acctId,
                transactionId: uuidv4(),
                type: "deposit",
                amount: parseFloat(formData.account.initialDeposit),
                description: "Initial deposit",
                date: new Date().toISOString(),
                category: "initial",
              },
            ],
            monthlyStats: {
              [new Date().toISOString().slice(0, 7)]: {
                income: parseFloat(formData.account.initialDeposit),
                spend: 0,
              },
            },
          },
        ],
        createdAt: new Date().toISOString(),
        lastLogin: null,
        isActive: true,
      };

      console.log("User data to be saved:", user.username, user);

      await signUp({
        username: user.username,
        password,
        options: {
          userAttributes: {
            email: user.email,
            phone_number: user.phoneNumber,
            given_name: user.firstName,
            family_name: user.lastName,
            address: `${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.postalCode}, ${user.address.country}`,
            birthdate: user.birthDate,
          },
        },
      });

      await saveUserData("signup", user);

      alert("Sign up successful! Now confirm your account.");
      navigate("/confirm", { state: { user: user.username } });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Create Account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSignUp}>
          <Grid container spacing={3}>
            {/* Left Column - Personal Information */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>

              <TextField
                fullWidth
                required
                label="Username"
                value={formData.username}
                onChange={(e) => handleChange(e, "username")}
                margin="normal"
              />

              <TextField
                fullWidth
                required
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange(e, "email")}
                margin="normal"
              />

              <TextField
                fullWidth
                required
                label="Phone Number"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleChange(e, "phoneNumber")}
                margin="normal"
              />

              <TextField
                fullWidth
                required
                label="First Name"
                value={formData.firstName}
                onChange={(e) => handleChange(e, "firstName")}
                margin="normal"
              />

              <TextField
                fullWidth
                required
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => handleChange(e, "lastName")}
                margin="normal"
              />

              <TextField
                fullWidth
                required
                label="Birthdate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleChange(e, "birthDate")}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                fullWidth
                required
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                required
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Right Column - Address & ID Information */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Address Information
              </Typography>

              <TextField
                fullWidth
                required
                label="Street Address"
                value={formData.address.street}
                onChange={(e) => handleChange(e, "address.street")}
                margin="normal"
              />

              <TextField
                fullWidth
                required
                label="City"
                value={formData.address.city}
                onChange={(e) => handleChange(e, "address.city")}
                margin="normal"
              />

              <TextField
                fullWidth
                required
                label="State"
                value={formData.address.state}
                onChange={(e) => handleChange(e, "address.state")}
                margin="normal"
              />

              <TextField
                fullWidth
                required
                label="Postal Code"
                value={formData.address.postalCode}
                onChange={(e) => handleChange(e, "address.postalCode")}
                margin="normal"
              />

              <TextField
                fullWidth
                required
                label="Country"
                value={formData.address.country}
                onChange={(e) => handleChange(e, "address.country")}
                margin="normal"
              />

              <TextField
                fullWidth
                required
                label="SSN (Last 4)"
                inputProps={{ maxLength: 4 }}
                value={formData.ssnLast4}
                onChange={(e) => handleChange(e, "ssnLast4")}
                margin="normal"
              />
            </Grid>
          </Grid>

          {/* ID Information */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              ID Information
            </Typography>

            <Grid container spacing={2}>
              <Grid item size="grow">
                <FormControl fullWidth required margin="normal">
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={formData.governmentId.type}
                    label="ID Type"
                    onChange={(e) => handleChange(e, "governmentId.type")}
                  >
                    <MenuItem value="driver_license">Driver's License</MenuItem>
                    <MenuItem value="passport">Passport</MenuItem>
                    <MenuItem value="state_id">State ID</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item size="grow">
                <TextField
                  fullWidth
                  required
                  label="ID Number"
                  value={formData.governmentId.number}
                  onChange={(e) => handleChange(e, "governmentId.number")}
                  margin="normal"
                />
              </Grid>

              <Grid item size="grow">
                <TextField
                  fullWidth
                  required
                  label="Issued State"
                  value={formData.governmentId.issuedState}
                  onChange={(e) => handleChange(e, "governmentId.issuedState")}
                  margin="normal"
                />
              </Grid>

              <Grid item size="grow">
                <TextField
                  fullWidth
                  required
                  label="ID Expiration Date"
                  type="date"
                  value={formData.governmentId.expirationDate}
                  onChange={(e) =>
                    handleChange(e, "governmentId.expirationDate")
                  }
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Bank Account Information */}
          <Paper elevation={1} sx={{ p: 3, mt: 3, backgroundColor: "#f5f5f5" }}>
            <Typography variant="h6" gutterBottom>
              Initial Bank Account
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required margin="normal">
                  <InputLabel>Account Type</InputLabel>
                  <Select
                    value={formData.account.type}
                    label="Account Type"
                    onChange={(e) => handleChange(e, "account.type")}
                  >
                    <MenuItem value="checking">Checking Account</MenuItem>
                    <MenuItem value="savings">Savings Account</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Routing Number"
                  value="021000021"
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  helperText="Fixed routing number for all accounts"
                />

                <TextField
                  fullWidth
                  label="Account Number"
                  value={formData.account.accountNumber}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  helperText="Auto-generated account number"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Initial Deposit"
                  type="number"
                  inputProps={{
                    min: 0,
                    step: 0.01,
                  }}
                  value={formData.account.initialDeposit}
                  onChange={(e) => handleChange(e, "account.initialDeposit")}
                  margin="normal"
                  helperText="Minimum deposit: $25.00"
                />
              </Grid>
            </Grid>
          </Paper>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ px: 6, py: 1.5 }}
            >
              Create Account
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default SignUp;
