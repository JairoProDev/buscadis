// App.js
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import UserProfile from "./components/UserProfile/UserProfile";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/:adType" element={<HomePage />} />
          {/* <Route path="*" element={<HomePage />} /> */}
          <Route path="/:adType/:category" element={<HomePage />} />
          <Route path="/:adType/:category/:subcategory" element={<HomePage />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;