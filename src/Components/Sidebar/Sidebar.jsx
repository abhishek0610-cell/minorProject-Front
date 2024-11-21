import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaUserGraduate, FaSignOutAlt, FaChalkboardTeacher, FaBook, FaIdCard } from "react-icons/fa";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

const Sidebar = () => {
  const [loading, setLoading] = useState(false); // State to manage loading
  const navigate = useNavigate(); // for navigation

  const userData = JSON.parse(localStorage.getItem('userData'));

  if (!userData || !userData.token) {
    console.error('No user data or token found in localStorage');
    toast.error('No token found, please log in.');
    return;
  }

  const handleLogout = async () => {
    setLoading(true); // Start loading
    
    // Start the toast with loading state
    const logoutToast = toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            // Make the logout request with token and other details
            const { data } = await axios.post(
              'https://minor-project-backend-f25s.onrender.com/api/users/logout',
              { isConfirm: true }, // Any necessary body data
              {
                headers: {
                  Authorization: `Bearer ${userData.token}`, // Token in the Authorization header
                },
              }
            );

            // Check logout response
            if (data.isLoggedOut) {
              // Clear local storage
              localStorage.clear();
              navigate('/'); // Redirect to login page
              resolve('Successfully logged out!'); // Resolve promise with success message
            } else {
              reject('Logout failed, please try again!'); // Reject promise if logout fails
            }
          } catch (error) {
            reject('Logout failed, please try again!'); // Reject promise in case of error
          }
        }, 4000); // 4 seconds delay for logout
      }),
      {
        pending: 'Logging out...', // Toast message when loading
        success: 'Successfully logged out!', // Success message
        error: 'Logout failed, please try again!', // Error message
          // Apply custom styles to success and error messages
          style: {
            backgroundColor: '#4caf50', // Green background for success
            color: 'white',
          },
          errorStyle: {
            backgroundColor: '#f44336', // Red background for error
            color: 'white',
          },
      }
      
    );
  };

  return (
    <div className="flex h-full fixed">
      <ToastContainer
        position="top-right"         // Position of the toast container
        autoClose={5000}              // Auto close after 5 seconds
        hideProgressBar={false}       // Show the progress bar
        newestOnTop={true}            // Place new toasts on top
        closeButton={true}            // Show close button
        rtl={false}                   // Direction: Right-to-left (for RTL languages)
        pauseOnHover={true}           // Pause auto-close when hovering over toast
        draggable={true}              // Allow toast to be dragged
        draggablePercent={60}         // Percentage of width when dragging
     
      />{/* Container for toast notifications */}
      <div className="w-64 bg-white shadow-lg h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <FaUserGraduate className="text-blue-600 text-2xl" />
            <span className="ml-2 text-xl font-semibold">{userData.isAdmin ? "Admin" : "Student"} Console</span>
          </div>
        </div>
        <nav className="mt-6">
          {/* Links with appropriate icons */}
          <Link to="/dashboard" className="flex items-center w-full p-4 hover:bg-gray-100 transition-all duration-200">
            <FaChalkboardTeacher className="mr-3 text-lg" />
            <span>Dashboard</span>
          </Link>
          <Link to="/studyterminal" className="flex items-center w-full p-4 hover:bg-gray-100 transition-all duration-200">
            <FaBook className="mr-3 text-lg" />
            <span>Study Terminal</span>
          </Link>
          <Link to="/quizes" className="flex items-center w-full p-4 hover:bg-gray-100 transition-all duration-200">
            <FaBook className="mr-3 text-lg" />
            <span>Quizzes</span>
          </Link>
          <Link to="/profile" className="flex items-center w-full p-4 hover:bg-gray-100 transition-all duration-200">
            <FaIdCard className="mr-3 text-lg" />
            <span>Profile</span>
          </Link>
        </nav>

        {/* Logout Button at the bottom */}
        <div className="absolute bottom-6 left-0 w-full">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-4 text-red-500 hover:text-red-700 transition-all duration-200"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className="flex justify-center items-center space-x-2">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Logging out...</span>
              </div>
            ) : (
              <>
                <FaSignOutAlt className="mr-3 text-lg" />
                <span>Logout</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
