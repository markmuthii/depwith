import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from "@/lib/types";

const transactions = [
  {
    id: 1,
    transaction_type: "Deposit",
    amount: "100.00",
    date: "2023-01-01",
  },
  {
    id: 2,
    transaction_type: "Withdrawal",
    amount: "50.00",
    date: "2023-01-02",
  },
  {
    id: 3,
    transaction_type: "Deposit",
    amount: "200.00",
    date: "2023-01-03",
  },
  {
    id: 4,
    transaction_type: "Withdrawal",
    amount: "30.00",
    date: "2023-01-04",
  },
  {
    id: 5,
    transaction_type: "Deposit",
    amount: "150.00",
    date: "2023-01-05",
  },
  {
    id: 6,
    transaction_type: "Withdrawal",
    amount: "70.00",
    date: "2023-01-06",
  },
  {
    id: 7,
    transaction_type: "Deposit",
    amount: "300.00",
    date: "2023-01-07",
  },
  {
    id: 8,
    transaction_type: "Withdrawal",
    amount: "20.00",
    date: "2023-01-08",
  },
  {
    id: 9,
    transaction_type: "Deposit",
    amount: "250.00",
    date: "2023-01-09",
  },
  {
    id: 10,
    transaction_type: "Withdrawal",
    amount: "40.00",
    date: "2023-01-10",
  },
  {
    id: 11,
    transaction_type: "Deposit",
    amount: "400.00",
    date: "2023-01-11",
  },
];

const TransactionsTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <Table>
      {transactions.length > 0 && (
        <TableCaption>Your past transactions</TableCaption>
      )}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#</TableHead>
          <TableHead>Transaction Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.length > 0 ? (
          transactions.map((transaction, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>{transaction.transaction_type}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell className="text-right">
                {transaction.createdAt}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No transactions found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
};

export { TransactionsTable };
