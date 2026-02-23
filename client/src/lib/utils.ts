import { BalanceData, Transaction, TransactionData } from "@/lib/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_BASE_URL } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
  }).format(amount);
}

type TransactionCreatedData = {
  success: boolean;
  balance?: string;
  transaction?: Transaction;
  message?: string;
};

export const createTransaction = async (data: {
  amount: string;
  transaction_type: string;
}) => {
  let transactioncCreatedData: TransactionCreatedData = {
    success: false,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    transactioncCreatedData = await response.json();
  } catch (error) {}

  return transactioncCreatedData;
};

export const getTransactions = async () => {
  let transactionData: TransactionData = {
    success: false,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/transaction`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    transactionData = (await response.json()) as TransactionData;
  } catch (error) {
    console.log({ TransactionsError: error });
  }

  return transactionData;
};

export const getBalance = async () => {
  let balanceData: BalanceData = {
    success: false,
  };
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/balance`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    balanceData = (await response.json()) as BalanceData;
  } catch (error) {
    console.log({ BalanceError: error });
  }

  return balanceData;
};
