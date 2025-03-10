// src/pages/Testimonials.tsx
function Testimonials() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">What Our Customers Say</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Testimonial 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <p className="italic text-gray-700 mb-4">
            "HomeEase provided excellent service! The plumber arrived on time and fixed the issue quickly. Highly recommend!"
          </p>
          <p className="text-right font-bold text-blue-600">- Abhay Nath Singh</p>
          <p className="text-right text-sm text-gray-500">Baddi</p>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <p className="italic text-gray-700 mb-4">
            "Professional and reliable. The electrician was very knowledgeable and completed the job perfectly. Great experience!"
          </p>
          <p className="text-right font-bold text-blue-600">- Sahil Vashisht</p>
          <p className="text-right text-sm text-gray-500">Chandigarh</p>
        </div>

        {/* Testimonial 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <p className="italic text-gray-700 mb-4">
            "I was impressed by the affordability and quality of service. The cleaning team did an amazing job. Will definitely use HomeEase again!"
          </p>
          <p className="text-right font-bold text-blue-600">- Anshul Katoch</p>
          <p className="text-right text-sm text-gray-500">Kalka</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Have a Story to Share?</h2>
        <p className="mb-6 text-gray-600">We’d love to hear about your experience with HomeEase!</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Share Your Feedback
        </button>
      </div>
    </div>
  );
}

export default Testimonials;