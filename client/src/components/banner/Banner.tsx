import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import studentAnimation from "../../../public/STUDENT.json";

const Banner = () => {
  return (
    <section className="bg-white border-b">
      <div className="container mx-auto px-4 py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        {/* Text Section */}
        <div className="text-center lg:text-left lg:max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Manage Your Library <br />
            <span className="text-purple-600">Effortlessly & Quickly</span>
          </h1>
          <p className="text-gray-700 text-base md:text-lg mb-8">
            Explore available books, add new ones, and track borrow records with
            just a few clicks. Perfect for small libraries and students!
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link
              to="/books"
              className="bg-purple-600 text-white px-6 py-3 rounded-md shadow hover:bg-purple-700 transition"
            >
              📚 Explore Books
            </Link>
            <Link
              to="/borrow-summary"
              className="text-purple-700 font-medium hover:underline"
            >
              ➤ View Borrow Summary
            </Link>
          </div>
        </div>

        {/* Lottie Animation Section */}
        <div className="lg:w-1/2 w-full flex justify-center items-center">
          <div className="w-full max-w-md">
            <Lottie animationData={studentAnimation} loop={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
