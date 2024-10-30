import { CenterContent } from "@/components/center-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegisterPage = () => {
  return (
    <CenterContent>
      <div className="min-w-96 space-y-10">
        <h1 className="text-center text-2xl font-semibold">
          Create a new account
        </h1>
        <form className="space-y-4">
          <div className="username space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" />
          </div>

          <div className="email space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" />
          </div>

          <div className="phone space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="text" />
          </div>

          <div className="password space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>

          <Button className="w-full">Create Account</Button>
        </form>
      </div>
    </CenterContent>
  );
};

export { RegisterPage };
