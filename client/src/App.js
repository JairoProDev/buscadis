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
          <Route path="/category/:category" element={<HomePage />} />
          <Route path="/category/:category/:subcategory" element={<HomePage />} />
          <Route path="/*" element={<HomePage />} />
          {/* <Route path="/anuncio/:id" element={<AdModal />} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;