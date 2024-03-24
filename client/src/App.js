// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainComponent from './MainComponent';
import UserProfile from './components/UserProfile/UserProfile';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/*" element={<MainComponent />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;