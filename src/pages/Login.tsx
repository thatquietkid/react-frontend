import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);

      if (success) {
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      {/* Main Container */}
      <div className="relative w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        {/* Logo inside white background container, top-left corner */}
        <div className="absolute top-4 left-4 flex items-center space-x-3 z-20">
          <img
            src="/logo.jpg" // Replace with your actual logo path
            alt="Manav Rachna Institute Logo"
            className="h-12"
          />
          <h1 className="text-lg font-bold text-gray-800">Manav Rachna Institute</h1>
        </div>

        {/* Left Side: Image with colored background and blur */}
        <div className="relative hidden md:flex flex-1 items-center justify-center p-8 rounded-lg overflow-hidden">
          {/* Background color layer */}
          <div className="absolute inset-0 bg-blue-300 rounded-lg"></div>

          {/* Blur layer with transparency */}
          <div className="absolute inset-0 bg-white bg-opacity-40 blur-xl rounded-lg"></div>

          {/* The image */}
          <img
            src="/login.jpg" // Replace with your actual image path
            alt="Illustration"
            className="relative z-10 rounded-lg shadow-lg object-cover
              h-65 w-72
              md:h-96 md:w-96
              lg:h-[28rem] lg:w-[28rem]"
          />
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-8 pt-24 space-y-6 relative">
          {/* Welcome Message */}
          <div>
            <h2 className="text-xl font-bold text-gray-800">Welcome Back!</h2>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                  Keep me logged in
                </label>
              </div>

              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>

          {/* Signup Link */}
          <div className="text-sm text-center text-gray-500">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
