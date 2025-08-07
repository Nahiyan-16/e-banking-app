import React, { useEffect, useState } from "react";
import { signOut, getCurrentUser } from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../API/api";
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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  TrendingUp,
  Notifications,
  Settings,
  Logout,
} from "@mui/icons-material";
import logo from "../Images/logo.png";

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const CACHE_DURATION_MINUTES = 60;
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [showIdleModal, setShowIdleModal] = useState(false);

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

  useEffect(() => {
    const IDLE_TIMEOUT = 3 * 60 * 60 * 1000;
    let idleTimer;

    const resetTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        console.log("User idle for 3 hours, logging out.");
        localStorage.removeItem("userData");
        setShowIdleModal(true);
      }, IDLE_TIMEOUT);
    };

    const events = [
      "mousemove",
      "keydown",
      "mousedown",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(idleTimer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  const handleSignOut = async () => {
    localStorage.removeItem("userData");
    await signOut();
    navigate("/signin");
  };

  if (!user) {
    return (
      <Container maxWidth={isMobile ? "sm" : "md"}>
        <Box
          sx={{
            mt: { xs: 4, md: 8 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            px: { xs: 2, sm: 0 },
          }}
        >
          <LinearProgress sx={{ width: "100%", mb: 2 }} />
          <Typography
            variant={isMobile ? "body1" : "h6"}
            color="text.secondary"
            textAlign="center"
          >
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
  const recentTransactions = transactions.slice(-5).reverse();

  const currentMonth = new Date().toISOString().slice(0, 7);
  const income = monthlyStats[currentMonth]?.income || 0;
  const spend = monthlyStats[currentMonth]?.spend || 0;

  return (
    <Box
      sx={{
        borderRadius: { xs: 0, md: 3 },
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        pb: { xs: 2, md: 0 },
      }}
    >
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: 0,
          py: { xs: 1.5, md: 2 },
          mb: { xs: 2, md: 3 },
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: 60,
            height: 60,
          }}
        />
        <Container maxWidth={isMobile ? "sm" : "lg"}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={{ xs: 1.5, md: 2 }}
              sx={{ flex: 1, minWidth: 0 }}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: { xs: 36, md: 48 },
                  height: { xs: 36, md: 48 },
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  fontWeight: "bold",
                }}
              >
                {firstName?.[0]}
                {lastName?.[0]}
              </Avatar>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  variant={isMobile ? "body1" : "h6"}
                  color="text.primary"
                  noWrap
                >
                  {greeting}, {firstName}!
                </Typography>
                <Typography
                  variant={isMobile ? "caption" : "body2"}
                  color="text.secondary"
                  noWrap
                >
                  {email}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={{ xs: 0.5, md: 1 }}>
              <IconButton color="primary" size={isMobile ? "small" : "medium"}>
                <Notifications fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
              <IconButton color="primary" size={isMobile ? "small" : "medium"}>
                <Settings fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
              <IconButton
                onClick={handleSignOut}
                color="error"
                size={isMobile ? "small" : "medium"}
              >
                <Logout fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            </Stack>
          </Stack>
        </Container>
      </Paper>

      {/* Main Content */}
      <Container
        maxWidth={isMobile ? "sm" : "xl"}
        sx={{ px: { xs: 2, sm: 3, md: 3 } }}
      >
        {/* Alert - Only show if there's meaningful data */}
        {income - spend !== 0 && (
          <Alert
            severity="info"
            sx={{
              mb: { xs: 2, md: 3 },
              borderRadius: 2,
              fontSize: { xs: "0.875rem", md: "1rem" },
            }}
            icon={<TrendingUp />}
          >
            You have gained ${income - spend}. Keep it up!
          </Alert>
        )}

        {/* Main Grid Layout */}
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{
            pb: { xs: 2, md: 4 },
            // Ensure proper stacking on mobile
            flexDirection: { xs: "column", lg: "row" },
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {/* Mobile/Tablet: Account Card First */}
          <Grid
            item
            xs={12}
            lg={3}
            sx={{
              order: { xs: 1, lg: 3 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AccountCard
              balance={balance.toFixed(2)}
              accountNumber={accountNumber}
              monthlyIncome={income}
              monthlySpend={spend}
              user={user}
              setUser={setUser}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          </Grid>

          {/* Desktop: Quick Actions Left, Mobile: Second */}
          <Grid
            item
            xs={12}
            lg={3}
            sx={{
              order: { xs: 2, lg: 1 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <QuickActions isMobile={isMobile} isTablet={isTablet} />
          </Grid>

          {/* Transactions in Middle on Desktop, Third on Mobile */}
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              order: { xs: 3, lg: 2 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Transactions
              recentTransactions={recentTransactions}
              allTransactions={transactions.reverse()}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Idle Modal */}
      {showIdleModal && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            px: 2,
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              textAlign: "center",
              minWidth: { xs: "90%", sm: 300 },
              maxWidth: { xs: "100%", sm: 400 },
            }}
          >
            <Typography
              variant={isMobile ? "h6" : "h5"}
              gutterBottom
              sx={{ fontSize: { xs: "1.1rem", md: "1.25rem" } }}
            >
              You have been signed out due to inactivity.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 3,
                fontSize: { xs: "0.875rem", md: "1rem" },
              }}
            >
              Please sign in again to continue.
            </Typography>
            <Box
              component="button"
              sx={{
                padding: { xs: "12px 24px", md: "12px 32px" },
                backgroundColor: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: 500,
                minWidth: "120px",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
                "&:active": {
                  transform: "scale(0.98)",
                },
              }}
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
}

export default Home;
