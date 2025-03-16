import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function UserProfile() {
  const auth = useContext(AuthContext);
  const [userData, setUserData] = useState(auth?.user || {});
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", city: "" });

  useEffect(() => {
    if (auth?.user) {
      setUserData(auth.user);
      setFormData({ name: auth.user.name, email: auth.user.email, city: auth.user.city || "" });
    }
  }, [auth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${auth?.user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        auth?.login(auth.token as string, updatedUser);
        setUserData(updatedUser);
        setEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-600">User Profile</h2>

      {editing ? (
        <div className="space-y-4 mt-4">
          <input className="w-full border p-2 rounded" name="name" value={formData.name} onChange={handleChange} />
          <input className="w-full border p-2 rounded" name="email" value={formData.email} disabled />
          <input className="w-full border p-2 rounded" name="city" value={formData.city} onChange={handleChange} />

          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleUpdate}>
            Save Changes
          </button>
          <button className="text-red-500 ml-4" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>City:</strong> {userData.city || "Not set"}</p>

          <button className="bg-green-500 text-white px-4 py-2 rounded mt-3 hover:bg-green-600" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
