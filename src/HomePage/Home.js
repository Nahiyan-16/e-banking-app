import React, { useEffect, useState } from "react";
import { signOut, getCurrentUser } from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../api";
import QuickActions from "./QuickActions";
import Transactions from "./Transactions";
import AccountCard from "./AccountCard";
import {
  Container,
  Typography,
  Grid,
  Box,
  Avatar,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Alert,
} from "@mui/material";
import {
  TrendingUp,
  Notifications,
  Settings,
  Logout,
} from "@mui/icons-material";

function Home() {
  const navigate = useNavigate();
  const CACHE_DURATION_MINUTES = 60;
  const [user, setUser] = useState(null);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    const loadUserData = async () => {
      try {
        const cached = localStorage.getItem("userData");
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          const age = (Date.now() - timestamp) / (1000 * 60);
          if (age < CACHE_DURATION_MINUTES) {
            setUser(data);
            return;
          }
        }

        const currentUser = await getCurrentUser();
        const userId = currentUser.username;
        const freshUser = await fetchUserData(userId);
        localStorage.setItem(
          "userData",
          JSON.stringify({ data: freshUser, timestamp: Date.now() })
        );
        setUser(freshUser);
      } catch (error) {
        console.error("Error loading user:", error);
        navigate("/signin");
      }
    };

    loadUserData();
  }, [navigate]);

  const handleSignOut = async () => {
    localStorage.removeItem("userData");
    await signOut();
    navigate("/signin");
  };

  const toggleBalanceVisibility = () => {
    setBalanceVisible((prev) => !prev);
  };

  if (!user) {
    return (
      <Container maxWidth="md">
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LinearProgress sx={{ width: "100%", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Loading your dashboard...
          </Typography>
        </Box>
      </Container>
    );
  }

  const { firstName, lastName, email, accounts } = user;
  const primaryAccount = accounts?.[0] || {};
  const {
    balance = 0,
    accountNumber = "****",
    transactions = [],
    monthlyStats = {},
  } = primaryAccount;
  const recentTransactions = transactions.slice(0, 5);

  return (
    <Box
      sx={{
        minHeight: "60vh",
        maxHeight: "98vh",
        borderRadius: 3,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        pb: 0,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: 0,
          py: 2,
          mb: 3,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 48,
                  height: 48,
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                {firstName?.[0]}
                {lastName?.[0]}
              </Avatar>
              <Box>
                <Typography variant="h6" color="text.primary">
                  {greeting}, {firstName}!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {email}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
              <IconButton color="primary">
                <Notifications />
              </IconButton>
              <IconButton color="primary">
                <Settings />
              </IconButton>
              <IconButton onClick={handleSignOut} color="error">
                <Logout />
              </IconButton>
            </Stack>
          </Stack>
        </Container>
      </Paper>

      <Container maxWidth="xl">
        <Alert
          severity="info"
          sx={{ mb: 3, borderRadius: 2 }}
          icon={<TrendingUp />}
        >
          Your account earned $12.50 in interest this month. Keep it up!
        </Alert>

        <Grid container spacing={3} sx={{ pb: 4 }}>
          <QuickActions />
          <Transactions recentTransactions={recentTransactions} />
          <AccountCard
            balance={balance.toFixed(2)}
            accountNumber={accountNumber}
            balanceVisible={balanceVisible}
            toggleBalanceVisibility={toggleBalanceVisibility}
            recentTransactions={recentTransactions}
            monthlyStats={monthlyStats}
            user={user}
            setUser={setUser}
          />
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
