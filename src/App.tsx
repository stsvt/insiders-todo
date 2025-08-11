import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Homepage from "./pages/Homepage";
import { useState } from "react";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const [token, setToken] = useState<string | null>(function () {
    return localStorage.getItem("token");
  });

  const handleSetToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setToken={handleSetToken} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/homepage"
          element={
            <ProtectedRoute token={token}>
              <Homepage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
