import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { GetApp } from "@mui/icons-material";
import { useState } from "react";
import { recordTransaction } from "../../Utils/RecordTransaction";

function ReceiveCheckButton({ user, setUser }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setAmount("");
    setFrom("");
  };

  const handleSubmit = async () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0 || !from) return;

    const now = new Date().toISOString();
    const updatedUser = { ...user };
    const account = updatedUser.accounts[0];

    // Update balance
    account.balance = Number(account.balance || 0) + parsedAmount;

    // Add transaction
    account.transactions.unshift({
      id: crypto.randomUUID(),
      type: "deposit",
      amount: parsedAmount,
      description: `Check from ${from}`,
      date: now,
    });

    // Update monthly income
    const month = new Date().toISOString().slice(0, 7); // e.g. "2025-08"
    if (!account.monthlyStats) account.monthlyStats = {};
    if (!account.monthlyStats[month])
      account.monthlyStats[month] = { income: 0, spending: 0 };

    account.monthlyStats[month].income += parsedAmount;

    setUser(updatedUser);
    localStorage.setItem(
      "userData",
      JSON.stringify({ data: updatedUser, timestamp: Date.now() })
    );

    await recordTransaction({
      username: updatedUser.username,
      accountId: updatedUser.accountId,
      amount: parsedAmount,
      type: "deposit",
      description: `Deposit from ${updatedUser.username}`,
    });

    handleClose();
  };

  return (
    <>
      <Button
        startIcon={<GetApp />}
        variant="outlined"
        size="large"
        onClick={handleOpen}
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Deposit a Check</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
            />
            <TextField
              label="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ReceiveCheckButton;
