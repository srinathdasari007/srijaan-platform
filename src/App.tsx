import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Workshops from './pages/Workshops';
import CheckoutPage from './pages/CheckoutPage';
import SuccessStories from './pages/SuccessStories';
import EmployeeDashboard from './pages/EmployeeDashboard';
import LeaveManagement from './pages/LeaveManagement';
import AttendancePage from './pages/AttendancePage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/workshops"
            element={
              <>
                <Navbar />
                <Workshops />
                <Footer />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Navbar />
                <CheckoutPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/success-stories"
            element={
              <>
                <Navbar />
                <SuccessStories />
                <Footer />
              </>
            }
          />

          {/* Employee routes - directly accessible */}
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/leaves" element={<LeaveManagement />} />
          <Route path="/employee/attendance" element={<AttendancePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;