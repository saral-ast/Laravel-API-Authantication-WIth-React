import React, { useState, useEffect } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../store/authSlice"; // <-- Add this

import { selectIsLoggedIn } from "../store/authSlice";
import LogoutButton from "../components/LogoutButton";

const Dashboard = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userFromStore = useSelector(selectUser);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Set user from Redux store if available, otherwise from localStorage
    if (userFromStore) {
      setUser(userFromStore);
    } else {
      // Get user data from localStorage as fallback
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }

    // Load dashboard data
    loadDashboardData();
  }, [isLoggedIn, navigate, userFromStore]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // This is a placeholder for when you implement the expenses API
      // const response = await axios.get('/api/expenses');
      // setExpenses(response.data.data.expenses);
      // setTotalExpense(response.data.data.total);

      // For now, we'll use dummy data
      setExpenses([
        {
          id: 1,
          title: "Groceries",
          amount: 150,
          date: "2023-06-15",
          category: "Food",
        },
        {
          id: 2,
          title: "Rent",
          amount: 1200,
          date: "2023-06-01",
          category: "Housing",
        },
        {
          id: 3,
          title: "Utilities",
          amount: 200,
          date: "2023-06-10",
          category: "Bills",
        },
      ]);
      setTotalExpense(1550);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      setError("Failed to load dashboard data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {user?.name || "User"}!
          </h1>
          <LogoutButton className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
        </div>
        <p className="text-gray-600">
          Manage your expenses and track your spending habits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Summary Card */}
        <div className="md:col-span-4">
          <div className="bg-white rounded-lg shadow-md p-6 h-full">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Total Expenses
            </h2>
            <p className="text-3xl font-bold text-blue-600">
              ${totalExpense.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Add Expense Button */}
        <div className="md:col-span-8 flex items-center">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => alert("Add expense form will be implemented here")}
          >
            Add New Expense
          </button>
        </div>

        {/* Recent Expenses */}
        <div className="md:col-span-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Recent Expenses
            </h2>

            {expenses.length === 0 ? (
              <p className="text-gray-500">
                No expenses recorded yet. Start by adding your first expense!
              </p>
            ) : (
              <div className="space-y-4">
                {expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {expense.title}
                        </h3>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-500 mr-3">
                            {new Date(expense.date).toLocaleDateString()}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {expense.category}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-semibold text-blue-600">
                          ${expense.amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
