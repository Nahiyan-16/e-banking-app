import { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import {
  TrendingUp,
  Visibility,
  VisibilityOff,
  CreditCard,
  AccountBalanceWallet,
} from "@mui/icons-material";
import ReceiveCheckButton from "./HomeUtils/ReceiveCheckButton";
import SendButton from "./HomeUtils/SendButton";

function AccountCard({
  balance,
  accountNumber,
  user,
  monthlyIncome: income,
  monthlySpend: spend,
  setUser,
}) {
  const [balanceVisible, setBalanceVisible] = useState(true);

  const toggleBalanceVisibility = () => {
    setBalanceVisible((prev) => !prev);
  };

  return (
    <Grid item xs={12} lg={3}>
      <Stack spacing={3}>
        {/* Credit Card */}
        <Card
          sx={{
            background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
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
          <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
            <Stack justifyContent="space-between" sx={{ height: "100%" }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box>
                  <Typography variant="body1" sx={{ opacity: 0.8 }}>
                    Primary Checking
                  </Typography>
                  <Typography variant="h3" sx={{ my: 0, fontWeight: "bold" }}>
                    {balanceVisible ? `$${balance}` : "••••••"}
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
                <SendButton user={user} setUser={setUser} />
                <ReceiveCheckButton user={user} setUser={setUser} />
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
                <Typography variant="h4" color="success.main" fontWeight="bold">
                  +$
                  {income.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
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
                <Typography variant="h4" color="warning.main" fontWeight="bold">
                  -$
                  {spend.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Grid>
  );
}

export default AccountCard;
