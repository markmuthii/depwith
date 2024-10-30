import { Button } from "@/components/ui/button";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { UserDashboard } from "@/pages/user-dashboard";
import { useEffect, useState } from "react";

function App() {
  const [page, setPage] = useState("dashboard");

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const updateLoginStatus = () => {
    setIsLoggedIn((prev) => !prev);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setPage("login");
    } else {
      setPage("dashboard");
    }
  }, [isLoggedIn]);

  return (
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
            <Button variant={"link"} onClick={updateLoginStatus}>
              Logout
            </Button>
          </>
        )}
      </div>
      {page === "dashboard" && isLoggedIn && <UserDashboard />}
      {page === "login" && !isLoggedIn && (
        <LoginPage handleLoginClick={updateLoginStatus} />
      )}
      {page === "register" && !isLoggedIn && <RegisterPage />}
    </main>
  );
}

export default App;
