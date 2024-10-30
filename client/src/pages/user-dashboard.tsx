import { CenterContent } from "@/components/center-content";
import { TransactionsTable } from "@/components/transactions-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UserDashboard = () => {
  return (
    <CenterContent>
      <div className="balance text-right">
        <p className="text-xl">
          Current Balance: <strong>KSH 1000</strong>
        </p>
      </div>

      <div className="form">
        <form className="space-y-4">
          <Input type="text" />
          <div className="flex gap-1">
            <Button className="w-1/2" variant={"deposit"}>
              Deposit
            </Button>
            <Button className="w-1/2" variant={"withdraw"}>
              Withdraw
            </Button>
          </div>
        </form>
      </div>

      <div className="table">
        <h2 className="text-2xl font-semibold text-center">Transactions</h2>
        <TransactionsTable />
      </div>
    </CenterContent>
  );
};

export { UserDashboard };
