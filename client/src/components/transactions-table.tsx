import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from "@/lib/types";

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
    </Table>
  );
};

export { TransactionsTable };
