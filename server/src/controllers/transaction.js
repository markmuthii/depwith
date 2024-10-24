import { StatusCodes } from "http-status-codes";
import { Balance } from "../database/Models/Balance.js";
import { Transaction } from "../database/Models/Transaction.js";

export const createTransaction = async (req, res) => {
  // get the currently logged in user
  const { userId } = req;
  // get the details of the transaction (amount and the type)
  let { amount, transaction_type } = req.body;

  // Ensure that the amount that is received is a number
  if (isNaN(parseInt(amount))) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Amount must be a number",
    });
  }

  if (parseInt(amount) === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Amount must be more than 0",
    });
  }

  transaction_type =
    transaction_type.charAt(0).toUpperCase() +
    transaction_type.slice(1).toLowerCase();

  try {
    const userBalanceDoc = await Balance.findOne({
      user: userId,
    });

    const userBalance = userBalanceDoc.balance;

    if (transaction_type === "Deposit") {
      // Handle the deposit here
      // Deposit limitations

      if (amount < 100) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Amount is less than the allowed minimum of 100",
        });
      }

      if (amount > 100000) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Amount is more than the allowed maximum of 100000",
        });
      }

      // if type is deposit, increase the logged in user's balance by the amount
      // userBalanceDoc.balance = userBalanceDoc.balance + amount;
      userBalanceDoc.balance += amount;

      // TODO: Introduce transactions to deal with concurrency and incomplete processes
      // OP 1
      await userBalanceDoc.save();

      // OP 2
      const transactionDoc = await Transaction.create({
        user: userId,
        amount,
        transaction_type,
      });

      // remove the values that we do not need to send back to the client, and have the ones that we need in the transaction var
      const { _id, user, updatedAt, __v, ...transaction } =
        transactionDoc.toObject();

      return res.status(StatusCodes.OK).json({
        balance: userBalanceDoc.balance,
        transaction,
      });
    } else if (transaction_type === "Withdrawal") {
      // Handle the withdrawal here
      // if type is withdrawal, check if the currently logged in user's balance is more than or equal to the amount
      if (userBalance < amount) {
        // if it is not, deny the request
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Not enough balance",
        });
      }

      // if it is, deduct the amount from the balance
      userBalanceDoc.balance -= amount;

      await userBalanceDoc.save();

      // OP 2
      const transactionDoc = await Transaction.create({
        user: userId,
        amount,
        transaction_type,
      });

      // remove the values that we do not need to send back to the client, and have the ones that we need in the transaction var
      const { _id, user, updatedAt, __v, ...transaction } =
        transactionDoc.toObject();

      return res.status(StatusCodes.OK).json({
        balance: userBalanceDoc.balance,
        transaction,
      });
    } else {
      // Not a permitted type, respond with error
    }
  } catch (error) {
    console.log({ TransactionError: error });

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong while processing your request.",
    });
  }
};

export const getUserTransactions = async (req, res) => {
  const { userId } = req;

  const transactions = await Transaction.find({
    user: userId,
  });

  return res.status(StatusCodes.OK).json({ transactions });
};
