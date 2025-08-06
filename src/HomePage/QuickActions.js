import React from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
  Stack,
} from "@mui/material";
import {
  AccountBalance,
  SwapHoriz,
  Receipt,
  Assessment,
} from "@mui/icons-material";

function QuickActions() {
  return (
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
            <Button variant="outlined" fullWidth size="large" sx={{ py: 1.5 }}>
              Support Center
            </Button>
            <Button variant="outlined" fullWidth size="large" sx={{ py: 1 }}>
              Live Chat
            </Button>
            <Button variant="outlined" fullWidth size="large" sx={{ py: 1.5 }}>
              Call Us
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default QuickActions;
