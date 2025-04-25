import React from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../store/authSlice";

const Home = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-sm p-8 mt-8 mb-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Track Your Expenses with Ease
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A simple and intuitive way to manage your personal finances. Keep
          track of your spending, set budgets, and achieve your financial goals.
        </p>
        <div className="mt-8">
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Dashboard
            </Link>
          ) : (
            <div className="space-x-4">
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Track Expenses
          </h2>
          <p className="text-gray-600">
            Easily record and categorize your daily expenses. Get a clear
            picture of where your money is going.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Set Budgets
          </h2>
          <p className="text-gray-600">
            Create monthly budgets for different categories and track your
            progress to stay within your limits.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Visualize Data
          </h2>
          <p className="text-gray-600">
            View insightful charts and reports to understand your spending
            patterns and make better financial decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
