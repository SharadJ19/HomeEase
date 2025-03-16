function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="flex flex-col items-center space-y-4">
          {/* Brand Name and Logo */}
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="HomeEase Logo" className="w-8 h-8" />
            <h2 className="text-xl font-bold">HomeEase</h2>
          </div>

          {/* Contact Information */}
          <p className="text-sm text-gray-400">
            &copy; 2025 HomeEase. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Contact us:{" "}
            <a href="mailto:support@homeease.com" className="hover:text-blue-400">
              support@homeease.com
            </a>{" "}
            | Phone:{" "}
            <a href="tel:+917590889608" className="hover:text-blue-400">
              +91 75908 89608
            </a>
          </p>

          {/* Social Media Links */}
          <div className="flex space-x-6 mt-4">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;