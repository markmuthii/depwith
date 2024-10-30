import { CenterContent } from "@/components/center-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginPageProps = {
  handleLoginClick: () => void;
};

const LoginPage = ({ handleLoginClick }: LoginPageProps) => {
  return (
    <CenterContent>
      <div className="min-w-96 space-y-10">
        <h1 className="text-center text-2xl font-semibold">Welcome back.</h1>
        <form className="space-y-4">
          <div className="username space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" />
          </div>

          <div className="password space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>

          <Button
            className="w-full"
            onClick={() => {
              handleLoginClick();
            }}
          >
            Login
          </Button>
        </form>
      </div>
    </CenterContent>
  );
};

export { LoginPage };
