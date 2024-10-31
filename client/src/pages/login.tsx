import { CenterContent } from "@/components/center-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

type LoginPageProps = {
  handleLoginClick: () => void;
};

const LoginPage = ({ handleLoginClick }: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission

    if (!username || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    // Send the data to the server
    const data = { username, password };

    fetch("http://localhost:3005/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.success) {
          throw new Error(data.message);
        }

        toast.success("Login successful");
        handleLoginClick();
      })
      .catch((err) => {
        console.error({ LoginErr: err });
        toast.error(err.message);
      });
  };

  return (
    <CenterContent>
      <div className="min-w-96 space-y-10">
        <h1 className="text-center text-2xl font-semibold">Welcome back.</h1>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="username space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div className="password space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              value={password}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
      </div>
    </CenterContent>
  );
};

export { LoginPage };
