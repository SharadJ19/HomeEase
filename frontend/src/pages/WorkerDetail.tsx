import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const WorkerDetail = () => {
    const { workerId } = useParams<{ workerId: string }>();
    const [worker, setWorker] = useState<any>(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/workers/${workerId}`)
            .then(res => res.json())
            .then(data => setWorker(data))
            .catch(err => console.error("Error fetching worker details:", err));
    }, [workerId]);

    if (!worker) return <div className="text-center text-red-500 text-xl mt-6">Worker not found</div>;

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10 border border-gray-200">
            {/* Worker Name */}
            <h2 className="text-2xl font-bold text-center text-blue-600">
                {worker.userId?.name || "Worker"}
            </h2>

            {/* Services Section */}
            <div className="mt-4 bg-gray-100 p-3 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700">Services Offered</h3>
                <p className="text-sm text-gray-600 mt-1">{worker.services.join(", ")}</p>
            </div>

            {/* Worker Details */}
            <div className="mt-6 space-y-3 text-sm text-gray-700">
                <p><strong>Experience:</strong> {worker.experience} years</p>
                <p><strong>Available in:</strong> {worker.cities.join(", ")}</p>
                <p><strong>Rating:</strong> ⭐ {worker.rating || "No rating yet"}</p>
                <p><strong>Availability:</strong> {worker.availability ? "✅ Available" : "❌ Unavailable"}</p>
            </div>
        </div>
    );
};

export default WorkerDetail;
