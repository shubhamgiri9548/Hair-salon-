import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "./components/PublicLayout";

// Public pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Booking from "./pages/Booking";
import BookingSuccess from "./pages/BookingSuccess";

// Admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import AdminAppointments from "./pages/admin/Appointment";
import AdminCustomers from "./pages/admin/Customer";
import AdminServices from "./pages/admin/Services";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC WEBSITE ================= */}

        <Route element={<PublicLayout />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/services"
            element={<Services />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/book"
            element={<Booking />}
          />

          <Route
            path="/booking-success"
            element={<BookingSuccess />}
          />

        </Route>


        {/* ================= ADMIN ================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={<ProtectedAdminRoute />}
        >

          <Route element={<AdminLayout />}>

            <Route
              index
              element={<AdminDashboard />}
            />

            <Route
              path="appointments"
              element={<AdminAppointments />}
            />

            <Route
              path="customers"
              element={<AdminCustomers />}
            />

            <Route
              path="services"
              element={<AdminServices />}
            />

          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;