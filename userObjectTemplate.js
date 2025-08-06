const user = {
  id: "uuid-v4", // Unique user ID
  username: "nahiyan123",
  email: "nahiyan@example.com",
  phoneNumber: "+1-555-123-4567",
  firstName: "Nahiyan",
  lastName: "Ahmed",
  birthDate: "1998-01-15",
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "USA",
  },

  // KYC / Identity verification
  ssnLast4: "1234",
  governmentId: {
    type: "driver_license", // or "passport", "state_id"
    number: "D1234567",
    issuedState: "NY",
    expirationDate: "2029-01-01",
  },

  // Bank accounts
  accounts: [
    {
      accountId: "acct-abc123", // Unique internal bank ID
      type: "checking", // or "savings"
      routingNumber: "021000021",
      accountNumber: "*****6789", // Masked or encrypted
      balance: 1245.75,
      currency: "USD",
      createdAt: "2024-01-01T12:00:00Z",
      transactions: [
        {
          transactionId: "txn-001",
          type: "debit", // or "credit"
          amount: 40.5,
          currency: "USD",
          description: "Grocery Store",
          date: "2025-07-30T15:00:00Z",
          status: "completed",
        },
        {
          transactionId: "txn-002",
          type: "credit",
          amount: 500,
          currency: "USD",
          description: "Paycheck",
          date: "2025-07-28T08:30:00Z",
          status: "completed",
        },
      ],
    },
  ],

  // Timestamps
  createdAt: "2025-07-01T14:00:00Z",
  lastLogin: "2025-08-01T12:34:56Z",
  isActive: true,
};
