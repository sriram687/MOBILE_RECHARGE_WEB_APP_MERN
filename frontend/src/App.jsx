import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PlansPage from './pages/PlansPage';
import PaymentPage from './pages/PaymentPage';
import RechargeHistoryPage from './pages/RechargeHistoryPage';
import AdminPage from './pages/AdminPage';
import Notification from './components/Notification';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        {/* Global Notifications */}
        <Notification />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/history" element={<RechargeHistoryPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
