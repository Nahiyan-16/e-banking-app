import React, { useEffect, useState } from "react";
import { signOut } from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "./api";
import { getCurrentUser } from "@aws-amplify/auth";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  Avatar,
  IconButton,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  ButtonGroup,
  Alert,
} from "@mui/material";
import {
  AccountBalance,
  TrendingUp,
  SwapHoriz,
  Receipt,
  Assessment,
  Notifications,
  Settings,
  Logout,
  Visibility,
  VisibilityOff,
  CreditCard,
  Send,
  GetApp,
  AccountBalanceWallet,
  ShowChart,
} from "@mui/icons-material";

function Home() {
  const navigate = useNavigate();
  const CACHE_DURATION_MINUTES = 60;
  const [user, setUser] = useState(null);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Set greeting based on time of day
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
    setBalanceVisible(!balanceVisible);
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

  const { firstName, lastName, accounts, email } = user;
  const primaryAccount = accounts[0];
  const recentTransactions = primaryAccount?.transactions?.slice(0, 5) || [];
  const balance = primaryAccount?.balance?.toFixed(2) || "0.00";
  const accountNumber = primaryAccount?.accountNumber || "****";

  // Mock data for enhanced dashboard
  const monthlySpending = 2340.5;

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
      {/* Header */}
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

      <Container maxWidth="lg">
        {/* Alert for new features */}
        <Alert
          severity="info"
          sx={{ mb: 3, borderRadius: 2 }}
          icon={<TrendingUp />}
        >
          Your account earned $12.50 in interest this month. Keep it up!
        </Alert>

        {/* Main Content Grid */}
        <Grid container spacing={3} sx={{ pb: 4 }}>
          {/* Quick Actions - Left Side */}
          <Grid item xs={12} lg={3}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 4, fontWeight: "bold" }}>
                  Quick Actions
                </Typography>
                <Stack spacing={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<SwapHoriz />}
                    sx={{ py: 2, borderRadius: 2, fontSize: "1.1rem" }}
                    size="large"
                  >
                    Transfer Funds
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Receipt />}
                    sx={{ py: 2, borderRadius: 2, fontSize: "1.1rem" }}
                    size="large"
                  >
                    Pay Bills
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Assessment />}
                    sx={{ py: 2, borderRadius: 2, fontSize: "1.1rem" }}
                    size="large"
                  >
                    View Statements
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AccountBalance />}
                    sx={{ py: 1, borderRadius: 2, fontSize: "1.1rem" }}
                    size="large"
                  >
                    Open Account
                  </Button>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  Need Help?
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    sx={{ py: 1.5 }}
                  >
                    Support Center
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    sx={{ py: 1 }}
                  >
                    Live Chat
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    sx={{ py: 1.5 }}
                  >
                    Call Us
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Transactions - Middle */}
          <Grid item xs={12} lg={6}>
            <Card sx={{ borderRadius: 3, minHeight: "100%" }}>
              <CardContent sx={{ p: 4 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 4 }}
                >
                  <Typography variant="h5" fontWeight="bold">
                    Recent Transactions
                  </Typography>
                  <Button
                    size="large"
                    endIcon={<ShowChart />}
                    variant="outlined"
                    sx={{ ml: 2 }}
                  >
                    View All
                  </Button>
                </Stack>
                {recentTransactions.length === 0 ? (
                  <Box sx={{ textAlign: "center", py: 8 }}>
                    <Receipt
                      sx={{ fontSize: 64, color: "text.disabled", mb: 3 }}
                    />
                    <Typography variant="h6" color="text.secondary">
                      No recent transactions
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      Your transactions will appear here
                    </Typography>
                  </Box>
                ) : (
                  <List disablePadding>
                    {recentTransactions.map((txn, index) => (
                      <ListItem
                        key={txn.transactionId || index}
                        divider={index < recentTransactions.length - 1}
                        sx={{ px: 0, py: 2 }}
                      >
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 3,
                            bgcolor:
                              txn.type === "credit"
                                ? "success.light"
                                : "error.light",
                            color:
                              txn.type === "credit"
                                ? "success.contrastText"
                                : "error.contrastText",
                            mr: 3,
                          }}
                        >
                          {txn.type === "credit" ? (
                            <TrendingUp sx={{ fontSize: 28 }} />
                          ) : (
                            <SwapHoriz sx={{ fontSize: 28 }} />
                          )}
                        </Box>
                        <ListItemText
                          primary={
                            <Typography variant="h6" fontWeight="medium">
                              {txn.description}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body1" color="text.secondary">
                              {new Date(txn.date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </Typography>
                          }
                        />
                        <Typography
                          variant="h5"
                          color={
                            txn.type === "credit"
                              ? "success.main"
                              : "error.main"
                          }
                          fontWeight="bold"
                        >
                          {txn.type === "credit" ? "+" : "-"}$
                          {Math.abs(txn.amount).toFixed(2)}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Right Side - Credit Card and Income/Spending */}
          <Grid item xs={12} lg={3}>
            <Stack spacing={3} sx={{}}>
              {/* Credit Card */}
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                  color: "white",
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative",
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 50,
                    right: -60,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.1)",
                  }}
                />
                <CardContent
                  sx={{ p: 4, position: "relative", zIndex: 1, height: "50%" }}
                >
                  <Stack justifyContent="space-between" sx={{ height: "50%" }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Box>
                        <Typography variant="body1" sx={{ opacity: 0.8 }}>
                          Primary Checking
                        </Typography>
                        <Typography
                          variant="h3"
                          sx={{ my: 0, fontWeight: "bold" }}
                        >
                          {balanceVisible ? `${balance}` : "••••••"}
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.8 }}>
                          ••••{accountNumber.slice(-4)}
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          onClick={toggleBalanceVisibility}
                          sx={{ color: "white" }}
                        >
                          {balanceVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        <CreditCard sx={{ fontSize: 40, opacity: 0.8 }} />
                      </Stack>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <Button
                        startIcon={<Send />}
                        variant="contained"
                        size="large"
                        sx={{
                          bgcolor: "rgba(255, 255, 255, 0.2)",
                          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.3)" },
                          flex: 1,
                        }}
                      >
                        Send
                      </Button>
                      <Button
                        startIcon={<GetApp />}
                        variant="outlined"
                        size="large"
                        sx={{
                          borderColor: "white",
                          color: "white",
                          "&:hover": {
                            borderColor: "white",
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                          },
                          flex: 1,
                        }}
                      >
                        Receive
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>

              {/* Monthly Income */}
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: "success.light",
                        color: "success.contrastText",
                      }}
                    >
                      <TrendingUp sx={{ fontSize: 32 }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" color="text.secondary">
                        Monthly Income
                      </Typography>
                      <Typography
                        variant="h4"
                        color="success.main"
                        fontWeight="bold"
                      >
                        +$4,250.00
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Monthly Spending */}
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: "warning.light",
                        color: "warning.contrastText",
                      }}
                    >
                      <AccountBalanceWallet sx={{ fontSize: 32 }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" color="text.secondary">
                        Monthly Spending
                      </Typography>
                      <Typography
                        variant="h4"
                        color="warning.main"
                        fontWeight="bold"
                      >
                        -${monthlySpending}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
