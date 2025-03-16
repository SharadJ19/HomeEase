import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function WorkerProfile() {
  const auth = useContext(AuthContext);
  const [workerData, setWorkerData] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ services: "", experience: "", cities: "", availability: true });

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/workers/user/${auth?.user._id}`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setWorkerData(data);
          setFormData({
            services: data.services.join(", "),
            experience: data.experience.toString(),
            cities: data.cities.join(", "),
            availability: data.availability,
          });
        }
      } catch (error) {
        console.error("Error fetching worker profile:", error);
      }
    };

    fetchWorkerData();
  }, [auth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "availability" ? value === "true" : value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/workers/${workerData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
        body: JSON.stringify({
          services: formData.services.split(",").map((s) => s.trim()),
          experience: Number(formData.experience),
          cities: formData.cities.split(",").map((c) => c.trim()),
          availability: formData.availability,
        }),
      });

      if (response.ok) {
        const updatedWorker = await response.json();
        setWorkerData(updatedWorker);
        setEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-600">Worker Profile</h2>

      {editing ? (
        <div className="space-y-4 mt-4">
          <input className="w-full border p-2 rounded" name="services" value={formData.services} onChange={handleChange} />
          <input className="w-full border p-2 rounded" name="experience" value={formData.experience} onChange={handleChange} />
          <input className="w-full border p-2 rounded" name="cities" value={formData.cities} onChange={handleChange} />
          <select className="w-full border p-2 rounded" name="availability" value={formData.availability.toString()} onChange={handleChange}>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>

          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleUpdate}>
            Save Changes
          </button>
          <button className="text-red-500 ml-4" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          <p><strong>Services:</strong> {workerData?.services.join(", ")}</p>
          <p><strong>Experience:</strong> {workerData?.experience} years</p>
          <p><strong>Cities:</strong> {workerData?.cities.join(", ")}</p>
          <p><strong>Rating:</strong> {workerData?.rating || "No ratings yet"}</p>
          <p><strong>Availability:</strong> {workerData?.availability ? "✅ Available" : "❌ Unavailable"}</p>

          <button className="bg-green-500 text-white px-4 py-2 rounded mt-3 hover:bg-green-600" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default WorkerProfile;
