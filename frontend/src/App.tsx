import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetail from "./pages/ServiceDetail";
import WorkerDetail from "./pages/WorkerDetail";

import Testimonials from "./pages/Testimonials";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

// Dashboard Pages
import UserDashboard from "./pages/UserDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";

// Authentication Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Profile Pages
import UserProfile from "./pages/UserProfile";
import WorkerProfile from "./pages/WorkerProfile";

function App() {
  return (
    <AuthProvider>
      <Router basename="/">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/testimonials" element={<Testimonials />} />

              {/* Protected Services and Worker Routes */}
              <Route path="/services" element={<PrivateRoute><ServicesPage /></PrivateRoute>} />
              <Route path="/services/:serviceName" element={<PrivateRoute><ServiceDetail /></PrivateRoute>} />
              <Route path="/worker/:workerId" element={<PrivateRoute><WorkerDetail /></PrivateRoute>} />
              
              {/* Protected Dashboard Routes */}
              <Route path="/user-dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
              <Route path="/worker-dashboard" element={<PrivateRoute><WorkerDashboard /></PrivateRoute>} />

              {/* Profile Routes */}
              <Route path="/user-profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
              <Route path="/worker-profile" element={<PrivateRoute><WorkerProfile /></PrivateRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
