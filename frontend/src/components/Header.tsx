import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const auth = useContext(AuthContext);

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="HomeEase Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold">HomeEase</h1>
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6 items-center">
          <li>
            <Link to="/" className="hover:underline hover:text-blue-200 transition">
              Home
            </Link>
          </li>

          <li>
            <Link to="/services" className="hover:underline hover:text-blue-200 transition">
              Services
            </Link>
          </li>

          <li>
            <Link to="/about" className="hover:underline hover:text-blue-200 transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/testimonials" className="hover:underline hover:text-blue-200 transition">
              Testimonials
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline hover:text-blue-200 transition">
              Contact
            </Link>
          </li>

          {/* Dashboard Navigation (Based on User Role) */}
          {auth?.user && (
            <li>
              <Link
                to={auth.user.role === "worker" ? "/worker-dashboard" : "/user-dashboard"}
                className="px-4 py-2 bg-gray-200 text-blue-800 font-semibold rounded-lg hover:bg-gray-300 transition"
              >
                Dashboard
              </Link>
            </li>
          )}

          {/* Login/Register or Logout */}
          {!auth?.token ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition"
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                onClick={auth.logout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
