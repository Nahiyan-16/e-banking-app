import { v4 as uuidv4 } from "uuid";
import { saveUserData } from "../API/api";

export const recordTransaction = async ({
  username,
  accountId,
  amount,
  type,
  description,
  category,
}) => {
  const now = new Date().toISOString();

  return saveUserData("transaction", {
    username,
    transaction: {
      accountId,
      transactionId: uuidv4(),
      type,
      amount,
      description,
      date: now,
      category: category,
    },
  });
};
