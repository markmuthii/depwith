import { Button } from "@/components/ui/button";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { UserDashboard } from "@/pages/user-dashboard";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { API_BASE_URL } from "./lib/constants";

function App() {
  const [page, setPage] = useState("dashboard");

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const updateLoginStatus = () => {
    setIsLoggedIn((prev) => !prev);
  };

  const handleLogout = () => {
    fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) throw new Error("Error logging you out");

        setIsLoggedIn(false);
        setPage("login");
        toast.success("Logout successful");
      })
      .catch((err) => {
        console.log(err);

        toast.error("Error logging you out");
      });
  };

  const userRegistered = () => {
    setPage("login");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setPage("login");
    } else {
      setPage("dashboard");
    }
  }, [isLoggedIn]);

  return (
    <>
      <Toaster position="bottom-center" richColors />
      <main className="h-screen">
        <div className="flex justify-center">
          {!isLoggedIn ? (
            <>
              <Button variant={"link"} onClick={() => setPage("register")}>
                Register
              </Button>
              <Button variant={"link"} onClick={() => setPage("login")}>
                Login
              </Button>
            </>
          ) : (
            <>
              <Button variant={"link"} onClick={() => setPage("dashboard")}>
                Dashboard
              </Button>
              <Button variant={"link"} onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>
        {page === "dashboard" && isLoggedIn && <UserDashboard />}
        {page === "login" && !isLoggedIn && (
          <LoginPage handleLoginClick={updateLoginStatus} />
        )}
        {page === "register" && !isLoggedIn && (
          <RegisterPage handleUserRegister={userRegistered} />
        )}
      </main>
    </>
  );
}

export default App;
