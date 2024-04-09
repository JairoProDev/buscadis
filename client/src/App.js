// App.js
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MainComponent from "./MainComponent";
import UserProfile from "./components/UserProfile/UserProfile";
import { AuthProvider } from "./context/AuthContext";
// import AdModal from './components/AdModal/AdModal';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/*" element={<MainComponent />} />
          {/* <Route path="/anuncio/:id" element={<AdModal />} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
