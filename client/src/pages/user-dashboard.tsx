import { CenterContent } from "@/components/center-content";
import { TransactionsTable } from "@/components/transactions-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Transaction } from "@/lib/types";
import { createTransaction, getBalance, getTransactions } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const UserDashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState("");
  const [userAmount, setUserAmount] = useState("");
  const [trackTransactions, setTrackTransactions] = useState(0);

  // Send a request to the server to get the user's transactions
  // Display the transactions in the table

  const handleDeposit = async () => {
    const data = {
      transaction_type: "Deposit",
      amount: userAmount,
    };

    const trxCreatedData = await createTransaction(data);

    if (trxCreatedData.success) {
      setTrackTransactions((prev) => prev + 1);
      toast.success("Transaction has been created successfully");
    } else {
      toast.error(trxCreatedData.message);
    }
  };

  const handleWithdrawal = async () => {
    const data = {
      transaction_type: "Withdrawal",
      amount: userAmount,
    };

    const trxCreatedData = await createTransaction(data);

    if (trxCreatedData.success) {
      setTrackTransactions((prev) => prev + 1);
      toast.success("Transaction has been created successfully");
    } else {
      toast.error(trxCreatedData.message);
    }
  };

  useEffect(() => {
    setUserAmount("");
    // Fetch the user's transactions
    const loadTransactions = async () => {
      const transactionData = await getTransactions();

      if (transactionData.success) {
        setTransactions(transactionData.transactions ?? []);
      } else {
        toast.error("There was an error fetching your transactions");
      }
    };

    const loadBalance = async () => {
      const balanceData = await getBalance();

      if (balanceData.success) {
        setBalance(balanceData.balance ?? "");
      } else {
        toast.error("There was an error fetching your balance");
      }
    };

    loadTransactions();
    loadBalance();
  }, [trackTransactions]);

  return (
    <CenterContent>
      <div className="balance text-right">
        <p className="text-xl">
          Current Balance: <strong>KSH {balance}</strong>
        </p>
      </div>

      <div className="form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="space-y-4"
        >
          <Input
            type="number"
            value={userAmount}
            onChange={(e) => {
              setUserAmount(e.target.value);
            }}
          />
          <div className="flex gap-1">
            <Button
              className="w-1/2"
              variant={"deposit"}
              onClick={handleDeposit}
            >
              Deposit
            </Button>
            <Button
              className="w-1/2"
              variant={"withdraw"}
              onClick={handleWithdrawal}
            >
              Withdraw
            </Button>
          </div>
        </form>
      </div>

      <div className="table">
        <h2 className="text-2xl font-semibold text-center">Transactions</h2>
        <TransactionsTable transactions={transactions} />
      </div>
    </CenterContent>
  );
};

export { UserDashboard };
