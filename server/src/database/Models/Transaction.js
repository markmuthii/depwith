import { model, Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transaction_type: {
      type: String,
      enum: ["Deposit", "Withdrawal"],
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = model("Transaction", transactionSchema);

export { Transaction };
