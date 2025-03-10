import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Adjust the import path

const serviceDetails: Record<string, { name: string; description: string; price: string; rating: number; reviews: number; icon: string }> = {
    "milk-delivery": {
        name: "Milk Delivery",
        description: "Daily fresh milk delivered to your doorstep.",
        price: "₹50 - ₹200 per day",
        rating: 4.7,
        reviews: 285,
        icon: "/icons/milk.png"
    }
    ,
    plumbing: {
        name: "Plumbing",
        description: "We provide expert plumbing services including pipe repairs, leak detection, faucet installations, and drainage solutions.",
        price: "₹299 - ₹2,999",
        rating: 4.7,
        reviews: 1284,
        icon: "/icons/plumbing.png"
    },
    electrician: {
        name: "Electrician",
        description: "Our electricians handle wiring, repairs, circuit breaker installations, and electrical safety checks.",
        price: "₹199 - ₹1,999",
        rating: 4.6,
        reviews: 954,
        icon: "/icons/electrician.png"
    },
    carpentry: {
        name: "Carpentry",
        description: "Expert woodwork services including furniture repair, wardrobe installation, and custom woodwork.",
        price: "₹499 - ₹4,999",
        rating: 4.8,
        reviews: 875,
        icon: "/icons/carpentry.png"
    },
    painting: {
        name: "Painting",
        description: "We offer residential and commercial painting services with high-quality finishes and durable paints.",
        price: "₹1,999 - ₹15,999",
        rating: 4.5,
        reviews: 732,
        icon: "/icons/painting.png"
    },
    cleaning: {
        name: "Cleaning",
        description: "Professional deep cleaning services for homes, offices, kitchens, and bathrooms using eco-friendly products.",
        price: "₹699 - ₹3,499",
        rating: 4.6,
        reviews: 1230,
        icon: "/icons/cleaning.png"
    },
    "pest-control": {
        name: "Pest Control",
        description: "Safe and effective pest control solutions for homes and offices, covering termites, cockroaches, bed bugs, and more.",
        price: "₹899 - ₹3,999",
        rating: 4.7,
        reviews: 642,
        icon: "/icons/pestcontrol.png"
    },
    landscaping: {
        name: "Landscaping",
        description: "Beautiful garden and lawn maintenance services, including grass cutting, plant care, and irrigation solutions.",
        price: "₹1,499 - ₹9,999",
        rating: 4.5,
        reviews: 543,
        icon: "/icons/landscaping.png"
    },
    "appliance-repair": {
        name: "Appliance Repair",
        description: "Expert repair services for washing machines, refrigerators, microwaves, and other home appliances.",
        price: "₹299 - ₹2,999",
        rating: 4.7,
        reviews: 890,
        icon: "/icons/appliance.png"
    },
    "hvac-services": {
        name: "HVAC Services",
        description: "Professional repair and maintenance of heating, ventilation, and air conditioning systems.",
        price: "₹499 - ₹5,999",
        rating: 4.6,
        reviews: 476,
        icon: "/icons/hvac.png"
    },
    "home-security": {
        name: "Home Security",
        description: "Installation and maintenance of CCTV cameras, biometric locks, and smart security systems.",
        price: "₹2,499 - ₹19,999",
        rating: 4.8,
        reviews: 321,
        icon: "/icons/security.png"
    },
    roofing: {
        name: "Roofing",
        description: "High-quality roof repairs, waterproofing, and installation of weather-resistant roofing materials.",
        price: "₹4,999 - ₹49,999",
        rating: 4.6,
        reviews: 289,
        icon: "/icons/roofing.png"
    },
    "moving-services": {
        name: "Moving Services",
        description: "Professional packing and relocation services for local and interstate moves.",
        price: "₹3,999 - ₹24,999",
        rating: 4.5,
        reviews: 674,
        icon: "/icons/moving.png"
    }
};

function ServiceDetail() {
    const { serviceName } = useParams<{ serviceName: string }>();
    const service = serviceName ? serviceDetails[serviceName] : undefined;

    const { token } = useContext(AuthContext) || {}; // ✅ Extract token safely
    const [workers, setWorkers] = useState<any[]>([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedWorker, setSelectedWorker] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    // ✅ Fetch workers based on selected city and service
    useEffect(() => {
        if (!selectedCity || !serviceName) return;
        // console.log(`Fetching workers for: Service=${serviceName}, City=${selectedCity}`);

        fetch(`http://localhost:5000/api/workers?service=${serviceName}&city=${selectedCity}`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                console.log("Workers received:", data);
                setWorkers(data);
            })
            .catch(err => console.error("Error fetching workers:", err));
    }, [selectedCity, serviceName]);

    // ✅ Booking function
    const handleBooking = async () => {
        if (!selectedWorker || !date || !time || !selectedCity) {
            alert("Please fill in all fields");
            return;
        }
    
        if (!token) {
            alert("You need to log in first!");
            return;
        }
    
        // console.log("🔍 Sending Token:", token);
    
        try {
            const response = await fetch("http://localhost:5000/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token.trim()}`, // ✅ Ensure no spaces or issues
                },
                body: JSON.stringify({
                    workerId: selectedWorker,
                    service: serviceName,
                    city: selectedCity,
                    date: new Date(`${date}T${time}`).toISOString(),
                }),
            });
    
            const responseData = await response.json();
            console.log("📨 Server Response:", responseData);
    
            if (!response.ok) {
                throw new Error(responseData.error || "Booking failed");
            }
    
            alert("✅ Booking successful!");
        } catch (error) {
            console.error("❌ Booking error:", error);
            alert(`Booking failed: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    };
    

    if (!service) return <div className="text-center text-red-500 text-xl mt-6">Service Not Found</div>;

    return (
        <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
            {/* Service Details */}
            <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
                <img src={service.icon} alt={service.name} className="w-24 h-24 mx-auto mb-6" />
                <h1 className="text-4xl font-bold mb-4 text-blue-600">{service.name}</h1>
                <p className="text-lg text-gray-700 mb-6">{service.description}</p>
                <div className="text-xl font-semibold text-green-600 mb-6">Starting from {service.price}</div>
                <div className="flex items-center mb-6">
                    <span className="text-yellow-500 text-2xl">★</span>
                    <span className="ml-1 text-lg font-semibold">{service.rating}</span>
                    <span className="ml-2 text-gray-500">({service.reviews} reviews)</span>
                </div>

                <h2 className="text-xl font-semibold text-gray-700">Available Workers</h2>
                <ul className="mt-4">
                    {workers.length > 0 ? (
                        workers.map(worker => (
                            <li key={worker._id} className="text-gray-700">
                                {worker.userId?.name || "Unknown"} - ({worker.experience} yrs exp) - ⭐ {worker.rating}
                            </li>
                        ))
                    ) : (
                        <p className="text-red-500">No workers available in this city.</p>
                    )}
                </ul>
            </div>

            {/* Booking Form */}
            <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Book {service.name}</h2>

                <input
                    type="text"
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.target.value)}
                    className="w-full border p-2 mb-4 rounded"
                    placeholder="Enter city"
                />

                <select
                    value={selectedWorker}
                    onChange={e => setSelectedWorker(e.target.value)}
                    className="w-full border p-2 mb-4 rounded"
                >
                    <option value="">Choose a worker</option>
                    {workers.map(worker => (
                        <option key={worker._id} value={worker._id}>
                            {worker.userId?.name || "Unknown"} ({worker.experience} yrs exp) - ⭐ {worker.rating}
                        </option>
                    ))}
                </select>

                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border p-2 mb-4 rounded" />
                <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full border p-2 mb-4 rounded" />

                <button
                    onClick={handleBooking}
                    className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
}

export default ServiceDetail;
