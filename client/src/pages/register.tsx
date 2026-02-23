import { useState } from "react";
import { CenterContent } from "@/components/center-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/constants";

type RegisterPageProps = {
  handleUserRegister: () => void;
};

const RegisterPage = ({ handleUserRegister }: RegisterPageProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !email || !phone || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }

    if (phone.length !== 10 || phone[0] !== "0") {
      toast.error("Invalid phone number. Should start with 0 and be 10 digits");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    // Send the data to the server
    const data = { username, email, phone, password };

    fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        if (data.message) {
          toast.success(data.message);
          handleUserRegister();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <CenterContent>
      <div className="min-w-96 space-y-10">
        <h1 className="text-center text-2xl font-semibold">
          Create a new account
        </h1>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="username space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              value={username}
              id="username"
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div className="email space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              id="email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="phone space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              value={phone}
              id="phone"
              type="text"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>

          <div className="password space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              value={password}
              id="password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <Button className="w-full">Create Account</Button>
        </form>
      </div>
    </CenterContent>
  );
};

export { RegisterPage };
