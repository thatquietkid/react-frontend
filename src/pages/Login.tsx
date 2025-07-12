import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const success = await login(username, password);

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
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Main Container */}
      {/* <div className="relative w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden md:flex"> */}
        {/* Logo inside white background container, top-left corner */}
        <div className="absolute top-4 left-4 flex items-center space-x-3 z-20">
          <img
            src="/logo.jpg" // Replace with your actual logo path
            alt="Manav Rachna Institute Logo"
            className="h-28 w-28"
            style={{ borderRadius: '50%' }} // Circular logo
          />
            <h1
            className="text-gray-800"
            style={{
              fontFamily: 'Alice, serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '40px',
            }}
            >
            Manav Rachna Institute
            </h1>
        </div>

        {/* Left Side: Image with colored background and blur */}
        <div className="relative hidden md:flex flex-1 items-center justify-center p-8 rounded-lg overflow-hidden">
          {/* Background color layer */}
          <div className="absolute inset-0 bg-white rounded-lg"></div>

          {/* Blur layer with transparency */}
          <div className="absolute inset-0 bg-white bg-opacity-40 blur-xl rounded-lg"></div>

          {/* The main image (login.jpg) */}
          <img
            src="/login.jpg"
            alt="Illustration"
            className="relative z-30 rounded-lg object-cover
              h-70 w-72
              md:h-96 md:w-96
              lg:h-[30rem] lg:w-[30rem]"
            style={{ zIndex: 30 }}
          />

          {/* The design logo (design.jpg), bottom left, at screen edge, further down and not overlapping login.jpg */}
          <img
            src="/design.jpg"
            alt="Design Logo"
            className="fixed left-0 z-10 rounded-lg object-contain
              w-40 h-40
              md:w-80 md:h-80
              lg:w-[22rem] lg:h-[22rem]"
            style={{
              pointerEvents: 'none',
              bottom: '-80px', // move further down
              left: '1',
              zIndex: 10,
            }}
          />
        </div>

        {/* Right Side: Form */}
        <div
          className="w-1/2 bg-no-repeat bg-cover bg-right min-h-screen flex items-center justify-center"
          style={{ 
            backgroundImage: "url('/background.jpg')",
            backgroundPosition: 'right 0px top', // Move background down by 60px
          }}
        >
          <div className="flex-1 p-8 pr-24 pt-24 space-y-6 relative border-l border-black-200 z-20">
            {/* Welcome Message */}
            <div>
              <h2 className="text-xl font-bold text-gray-800" style={
          {
            fontFamily: 'Inter, serif',
            fontWeight: 400,
            fontStyle: 'bold',
            fontSize: '36px',
            textAlign: 'center',
            zIndex: 50,
          }
              }>Welcome Back!</h2>
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
          <label htmlFor="username" className="z-50 block text-sm font-medium text-gray-700 sr-only">
          Username
          </label>
          <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {/* User/person icon for username */}
            <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
            focusable="false"
            role="img"
            >
            <title>Username</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
            </svg>
          </span>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className="mt-1 block w-full pl-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Username"
          />
          </div>
              </div>

              <div className='z-50'>
            <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* Lock icon for password */}
              <svg
              className="h-6 w-6 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              focusable="false"
              role="img"
              >
              <title>Password</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 10V8a4 4 0 10-8 0v2M5 10h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2zm7 4v2"
              />
              </svg>
            </span>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              className="mt-1 block w-full pl-12 pr-12 px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-600 transition focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
              // Eye-off icon
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Hide Password</title>
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7c1.326 0 2.587.26 3.738.736M17.657 16.657A8.001 8.001 0 004.343 7.343m1.414-1.414l14.142 14.142"
                />
              </svg>
              ) : (
              // Eye icon
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Show Password</title>
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 3-4 7-9 7s-9-4-9-7 4-7 9-7 9 4 9 7z"
                />
              </svg>
              )}
            </button>
            </div>
              </div>

              {error && (
          <div className="text-sm text-red-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
          </div>
              )}

              <div className="flex items-center justify-between">
          
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
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
          Sign Up
              </Link>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default Login;
