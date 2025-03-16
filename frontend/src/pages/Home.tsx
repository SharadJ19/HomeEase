import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to HomeEase</h1>
        <p className="text-lg mb-6">
          India’s trusted home service provider – from plumbing to carpentry, we’ve got you covered!
        </p>
        <Link to="/services">
          <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
            Explore Services
          </button>
        </Link>
      </div>

      {/* Services Overview */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Popular Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link key={service.name} to={`/services/${service.slug}`} className="block text-center p-4 border rounded-lg hover:shadow-lg transition">
            <img src={service.icon} alt={service.name} className="w-16 h-16 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">{service.name}</h3>
          </Link>          
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-12 bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Why Choose HomeEase?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">✅ Verified Professionals</h3>
            <p className="text-sm">Trained & background-checked experts for all services.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">💰 Affordable Pricing</h3>
            <p className="text-sm">Transparent pricing with no hidden costs.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">⏳ Quick & Reliable</h3>
            <p className="text-sm">Same-day service availability in major cities.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Book Your Service Today!</h2>
        <p className="mb-6">Hassle-free home services at your fingertips.</p>
        <Link to="/services">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

// List of Services (Replace with actual service icons)
const services = [
  { name: "Plumbing", slug: "plumbing", icon: "/icons/plumbing.png" },
  { name: "Electrician", slug: "electrician", icon: "/icons/electrician.png" },
  { name: "Carpentry", slug: "carpentry", icon: "/icons/carpentry.png" },
  { name: "Cleaning", slug: "cleaning", icon: "/icons/cleaning.png" },
];

export default Home;
