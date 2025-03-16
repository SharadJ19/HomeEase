import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Booking {
  _id: string;
  workerId: string;
  service: string;
  city: string;
  status: string;
  date: string;
}

export default function UserDashboard() {
  const auth = useContext(AuthContext);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!auth?.user) return;

    fetch(`${API_BASE_URL}/api/bookings?userId=${auth.user._id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error(err));
  }, [auth]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>
      <div className="bg-white shadow-md p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Your Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <ul className="mt-2 space-y-4">
            {bookings.map((booking) => (
              <li key={booking._id} className="p-4 border rounded bg-gray-100">
                <p><strong>Service:</strong> {booking.service}</p>
                <p><strong>City:</strong> {booking.city}</p>
                <p><strong>Status:</strong> <span className={`font-semibold ${booking.status === "completed" ? "text-green-600" : booking.status === "cancelled" ? "text-red-600" : "text-yellow-600"}`}>{booking.status}</span></p>
                <p><strong>Date:</strong> {new Date(booking.date).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
