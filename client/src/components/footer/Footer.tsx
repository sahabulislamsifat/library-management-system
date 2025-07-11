const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 mt-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left Side - Brand & Copyright */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-purple-600 mb-1">
              Library Manager
            </h2>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Middle - Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="/books"
              className="hover:text-purple-600 transition duration-300"
            >
              📚 Books
            </a>
            <a
              href="/create-book"
              className="hover:text-purple-600 transition duration-300"
            >
              ➕ Add Book
            </a>
            <a
              href="/borrow-summary"
              className="hover:text-purple-600 transition duration-300"
            >
              📊 Borrow Summary
            </a>
          </div>

          {/* Right - Social Icons */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition"
            >
              <svg
                fill="currentColor"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 0C5.372 0 0 5.372 0 12a12...Z" />{" "}
                {/* You can replace with actual icon */}
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition"
            >
              <svg
                fill="currentColor"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M22 12c0-5.522-4.478-10-10...Z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
