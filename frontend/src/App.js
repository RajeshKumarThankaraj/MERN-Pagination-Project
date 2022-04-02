import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, Routes, Route } from "react-router-dom";
import Page404 from "./components/Page404";
import LoginForm from "./components/LoginForm";
import UserPage from "./components/UserPage";

function App() {
  const user = localStorage.getItem("username");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="container-fluid p-0 vh-100">
      <Routes>
        <Route
          path="/"
          exact
          element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route
          path="/home"
          element={isLoggedIn || user ? <UserPage /> : <Navigate to="/" />}
        />

        <Route path="*" exact element={<Page404 />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
