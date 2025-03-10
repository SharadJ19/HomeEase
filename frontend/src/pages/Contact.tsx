function Contact() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Contact Us</h1>
      <p className="text-lg text-center mb-6 text-gray-700">
        Have any questions or need assistance? Reach out to us!
      </p>

      <div className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg border border-gray-100">
        {/* Name Field */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name"
          />
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Email"
          />
        </div>

        {/* Message Field */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">Message</label>
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Message"
            rows={5}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Send Message
        </button>
      </div>
    </div>
  );
}

export default Contact;