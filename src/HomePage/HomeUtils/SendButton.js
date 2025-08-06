import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { fetchUserData, saveUserData } from "../../api";
import { recordTransaction } from "../../Utils/RecordTransaction";

function SendButton({ user, setUser }) {
  const [open, setOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setRecipient("");
    setAmount("");
  };

  const handleSend = async () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0 || !recipient) return;

    const senderUser = { ...user };
    const senderAccount = senderUser.accounts?.[0];

    if (senderAccount.balance < parsedAmount) {
      alert("Insufficient balance");
      return;
    }

    try {
      const receiverUserData = await fetchUserData(recipient);
      if (!receiverUserData) {
        alert("Recipient not found");
        return;
      }

      const receiverUser = { ...receiverUserData };
      const receiverAccount = receiverUser.accounts?.[0];

      // Record both transactions (sender + receiver)
      await recordTransaction({
        username: senderUser.username,
        accountId: senderAccount.accountId,
        amount: parsedAmount,
        type: "send",
        description: `Sent to ${recipient}`,
        category: "Transfer",
      });

      await recordTransaction({
        username: receiverUser.username,
        accountId: receiverAccount.accountId,
        amount: parsedAmount,
        type: "receive",
        description: `Received from ${senderUser.username}`,
        category: "Transfer",
      });

      // OPTIONAL: Re-fetch updated sender user data from backend
      const updatedUser = await fetchUserData(senderUser.username);
      setUser(updatedUser);
      localStorage.setItem(
        "userData",
        JSON.stringify({ data: updatedUser, timestamp: Date.now() })
      );

      alert("Transfer successful");
      handleClose();
    } catch (error) {
      console.error("Send failed:", error);
      alert("Send failed");
    }
  };

  return (
    <>
      <Button
        startIcon={<Send />}
        variant="contained"
        size="large"
        onClick={handleOpen}
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.2)",
          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.3)" },
          flex: 1,
        }}
      >
        Send
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send Money</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Recipient Username"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              fullWidth
            />
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSend} variant="contained">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SendButton;
