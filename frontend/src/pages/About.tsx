import { Link } from "react-router-dom";

// src/pages/About.tsx
function About() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">About HomeEase</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
        <p className="text-lg text-gray-700 mb-6">
          HomeEase is your trusted partner for all home service needs. From plumbing and electrical work to carpentry and painting, we connect you with skilled professionals who get the job done right.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Our mission is to provide a seamless and reliable experience, ensuring customer satisfaction with every service request. With a growing network of experienced professionals, we guarantee high-quality workmanship at competitive prices.
        </p>

        {/* Why Choose Us Section */}
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-600">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">✅ Verified Professionals</h3>
            <p className="text-sm text-gray-600">All our professionals are trained, certified, and background-checked for your safety.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">💰 Affordable Pricing</h3>
            <p className="text-sm text-gray-600">Transparent pricing with no hidden costs. Get the best value for your money.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">⏳ Quick & Reliable</h3>
            <p className="text-sm text-gray-600">Same-day service availability in major cities. We respect your time.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">📞 24/7 Support</h3>
            <p className="text-sm text-gray-600">Our customer support team is always available to assist you.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">🏠 Wide Range of Services</h3>
            <p className="text-sm text-gray-600">From repairs to renovations, we cover all your home service needs.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">🌟 Customer Satisfaction</h3>
            <p className="text-sm text-gray-600">We prioritize your satisfaction and ensure a hassle-free experience.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Experience HomeEase?</h2>
          <p className="mb-6 text-gray-600">Join thousands of happy customers who trust us for their home service needs.</p>
          <Link to="/services">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Explore Services
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
  