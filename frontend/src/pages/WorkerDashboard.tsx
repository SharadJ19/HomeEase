import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

interface Booking {
  _id: string;
  userId: string;
  workerId: string;
  service: string;
  city: string;
  status: string;
  date: string;
}

interface Worker {
  _id: string;
  userId: string;
  services: string[];
  cities: string[];
}

export default function WorkerDashboard() {
  const auth = useContext(AuthContext);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkerProfile = async () => {
      try {
        if (!auth?.user?._id) return;

        const response = await fetch(`http://localhost:5000/api/workers/user/${auth.user._id}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch worker profile");

        const workerData = await response.json();
        console.log("Worker Data:", workerData);

        setWorker(workerData);
      } catch (error) {
        console.error("❌ Error fetching worker profile:", error);
      }
    };

    fetchWorkerProfile();
  }, [auth]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!worker?._id) return; // Ensure we have the worker ID

        const response = await fetch(`http://localhost:5000/api/bookings?workerId=${worker._id}`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch bookings");

        const data = await response.json();
        console.log("Bookings:", data);

        setBookings(data);
      } catch (error) {
        console.error("❌ Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (worker) {
      fetchBookings();
    }
  }, [worker, auth]);

  function handleStatusUpdate(_id: string, _arg1: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Worker Dashboard</h1>
      {loading ? <p>Loading...</p> : null}
      <div className="bg-white shadow-md p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Assigned Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings assigned.</p>
        ) : (
          <ul className="mt-2 space-y-4">
            {bookings.map((booking) => (
              <li key={booking._id} className="p-4 border rounded bg-gray-100">
                <p><strong>Service:</strong> {booking.service}</p>
                <p><strong>City:</strong> {booking.city}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`font-semibold ${booking.status === "completed" ? "text-green-600" : booking.status === "cancelled" ? "text-red-600" : "text-yellow-600"}`}>
                    {booking.status}
                  </span>
                </p>
                <p><strong>Date:</strong> {new Date(booking.date).toLocaleString()}</p>

                {booking.status === "pending" && (
                  <div className="mt-2 flex space-x-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => handleStatusUpdate(booking._id, "accepted")}>
                      Accept
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleStatusUpdate(booking._id, "cancelled")}>
                      Reject
                    </button>
                  </div>
                )}
                {booking.status === "accepted" && (
                  <button className="bg-blue-500 text-white px-3 py-1 rounded mt-2" onClick={() => handleStatusUpdate(booking._id, "completed")}>
                    Mark as Completed
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
