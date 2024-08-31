import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import UserProfile from "./components/UserProfile/UserProfile";
import { AuthProvider } from "./components/Auth/AuthContext";
import AuthForm from "./components/Auth/AuthForm";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/auth/login" element={<AuthForm isLoginForm={true} />} />
          <Route path="/auth/register" element={<AuthForm isLoginForm={false} />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/:adType/:category/:subcategory/:id" element={<HomePage />} />
          <Route path="/:adType/:category/:subcategory" element={<HomePage />} />
          <Route path="/:adType/:category" element={<HomePage />} />
          <Route path="/:adType" element={<HomePage />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
