import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';  // Assuming Navbar.tsx is in components folder
import Dashboard from './pages/Dashboard';
import Requests from './pages/Requests';


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/requests" element={<Requests />} />
        {/*<Route path="/feedbacks" element={<Feedbacks />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/settings/profile" element={<SettingsProfile />} />
        <Route path="/settings/account" element={<SettingsAccount />} />
        <Route path="/settings/notifications" element={<SettingsNotifications />} />*/}
      </Routes>
    </Router>
  );
};

export default App;
