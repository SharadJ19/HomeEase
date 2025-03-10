import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    role: "user", // Default role
    services: "",
    cities: "",
    experience: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const userData: { 
      name: string;
      email: string;
      password: string;
      city: string;
      role: string;
      [key: string]: any;
    } = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      city: formData.city.trim(),
      role: formData.role,
    };
  
    if (formData.role === "worker") {
      userData.services = formData.services.trim();
      userData.cities = formData.cities.trim();
      userData.experience = formData.experience;
    }
  
    console.log("Final Request Payload:", userData); // ✅ Debugging
  
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
  
      const responseData = await res.json();
      console.log("Response:", responseData); // ✅ Debugging
  
      if (!res.ok) {
        throw new Error(responseData.message || "Registration failed");
      }
  
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">Register</h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
        />

        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
        >
          <option value="user">User</option>
          <option value="worker">Worker</option>
        </select>

        {formData.role === "worker" && (
          <>
            <input
              name="services"
              value={formData.services}
              onChange={handleChange}
              placeholder="Services (comma-separated)"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            />

            <input
              name="cities"
              value={formData.cities}
              onChange={handleChange}
              placeholder="Cities (comma-separated)"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            />

            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Experience (years)"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            />
          </>
        )}

        <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition mt-4">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
