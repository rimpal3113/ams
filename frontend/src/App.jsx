import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import DoctorModal from "./components/DoctorModal";
import AppointmentModal from "./components/AppointmentModal";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/doctors" element={<Doctors />} />
  <Route path="/appointments" element={<Appointments />} />
  <Route path="/add-doctor" element={<DoctorModal />} />
  <Route
  path="/add-appointment"
  element={<AppointmentModal />}
/>
</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;