import { Router } from "express";
import {
  createTransaction,
  getUserTransactions,
} from "../../controllers/transaction.js";

const transactionRouter = Router();

// POST api/v1/transaction
transactionRouter.route("/").get(getUserTransactions).post(createTransaction);

export { transactionRouter };
