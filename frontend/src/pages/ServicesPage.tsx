import { Link } from "react-router-dom";

const services = [
  { name: "Milk Delivery", description: "Fresh Milk at Home.", icon: "/icons/milk.png" },
  { name: "Plumbing", description: "Fix leaks and install pipes.", icon: "/icons/plumbing.png" },
  { name: "Electrician", description: "Wiring and electrical repairs.", icon: "/icons/electrician.png" },
  { name: "Carpentry", description: "Custom furniture and woodwork.", icon: "/icons/carpentry.png" },
  { name: "Painting", description: "House and commercial painting.", icon: "/icons/painting.png" },
  { name: "Cleaning", description: "Housekeeping and deep cleaning.", icon: "/icons/cleaning.png" },
  { name: "Pest Control", description: "Professional pest removal services.", icon: "/icons/pestcontrol.png" },
  { name: "Landscaping", description: "Garden and lawn maintenance.", icon: "/icons/landscaping.png" },
  { name: "Appliance Repair", description: "Fixing household appliances.", icon: "/icons/appliance.png" },
  { name: "HVAC Services", description: "Heating and cooling system repairs.", icon: "/icons/hvac.png" },
  { name: "Home Security", description: "Installation of security systems.", icon: "/icons/security.png" },
  { name: "Roofing", description: "Roof installation and repairs.", icon: "/icons/roofing.png" },
  { name: "Moving Services", description: "Packing and transportation for relocation.", icon: "/icons/moving.png" }
];

function ServicesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Link to={`/services/${service.name.toLowerCase().replace(/\s+/g, "-")}`} key={index}>
            <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <img src={service.icon} alt={service.name} className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-xl font-semibold">{service.name}</h2>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;
