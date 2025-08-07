import React from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import {
  TrendingUp,
  SwapHoriz,
  Receipt,
  ShowChart,
  Close,
} from "@mui/icons-material";

function Transactions({ recentTransactions, allTransactions = [] }) {
  const [transactionsModalOpen, setTransactionsModalOpen] =
    React.useState(false);

  const handleOpenTransactionsModal = () => setTransactionsModalOpen(true);
  const handleCloseTransactionsModal = () => setTransactionsModalOpen(false);

  return (
    <>
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
                onClick={handleOpenTransactionsModal}
              >
                View All
              </Button>
            </Stack>

            {recentTransactions.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Receipt sx={{ fontSize: 64, color: "text.disabled", mb: 3 }} />
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
                          txn.type === "deposit" || txn.type === "receive"
                            ? "success.light"
                            : "error.light",
                        color:
                          txn.type === "deposit"
                            ? "success.contrastText"
                            : "error.contrastText",
                        mr: 3,
                      }}
                    >
                      {txn.type === "deposit" || txn.type === "receive" ? (
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
                        txn.type === "deposit" || txn.type === "receive"
                          ? "success.main"
                          : "error.main"
                      }
                      fontWeight="bold"
                    >
                      {txn.type === "deposit" || txn.type === "receive"
                        ? "+"
                        : "-"}
                      ${Math.abs(txn.amount).toFixed(2)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Modal for All Transactions */}
      <Dialog
        open={transactionsModalOpen}
        onClose={handleCloseTransactionsModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          All Transactions
          <IconButton onClick={handleCloseTransactionsModal}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ maxHeight: "70vh" }}>
          {allTransactions.length === 0 ? (
            <Typography>No transactions found.</Typography>
          ) : (
            <List disablePadding>
              {allTransactions.map((txn, index) => (
                <ListItem
                  key={txn.transactionId || index}
                  divider
                  sx={{ px: 0, py: 2 }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      bgcolor:
                        txn.type === "deposit" || txn.type === "receive"
                          ? "success.light"
                          : "error.light",
                      color:
                        txn.type === "deposit"
                          ? "success.contrastText"
                          : "error.contrastText",
                      mr: 3,
                    }}
                  >
                    {txn.type === "deposit" || txn.type === "receive" ? (
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
                      txn.type === "deposit" || txn.type === "receive"
                        ? "success.main"
                        : "error.main"
                    }
                    fontWeight="bold"
                  >
                    {txn.type === "deposit" || txn.type === "receive"
                      ? "+"
                      : "-"}
                    ${Math.abs(txn.amount).toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Transactions;
