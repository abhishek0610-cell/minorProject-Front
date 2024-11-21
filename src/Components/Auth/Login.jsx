import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);  // State for loading spinner
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true); // Show spinner when login starts
    setLoginError(''); // Reset login error message

    try {
      const response = await axios.post('https://minor-project-backend-f25s.onrender.com/api/users/login', { username, password });
      const data = response.data;

      if (data.hasFound) {
        localStorage.setItem('userData', JSON.stringify(data));
        navigate('/dashboard');
      }
      setTimeout(() => {
        setLoading(false); // Hide spinner after the response

      }, 2000);
    } catch (error) {
      setLoginError('Invalid username or password');
      setTimeout(() => {
        setLoading(false); // Hide spinner after the response

      }, 2000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">BTechQue</h2>
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">BTechQue</h2>
        <h3 className="text-2xl font-semibold text-center mb-6">Login</h3>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Show the spinner during the login request */}
          <div className={`w-full h-12 flex justify-center items-center ${loading ? 'block' : 'hidden'}`}>
            <div className="border-t-4 border-blue-500 border-solid w-8 h-8 rounded-full animate-spin"></div>
          </div>

          <button
            type="submit"
            disabled={loading} // Disable button during loading
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300`}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>

          {loginError && <p className="text-red-500 text-center">{loginError}</p>}
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
